import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axiosAPI from "../../Axios/axiossetup"
import Swal from "sweetalert2"
import { BASE_URL,PAYPAL_CLIENT_ID } from "../../Utils/constant";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Checkout(){

    const [order,setOrder]=useState({})
    const [couponCode,setCouponCode]=useState("")
    const [paymentLoading,setPaymentLoading]=useState(false)


    const param=useParams()

    useEffect(()=>{
        fetchOrdetData()
    },[])



    const fetchOrdetData=()=>{
    axiosAPI.get(`checkout/${param.order_oid}/`)
        .then(res=>{
            setOrder(res.data)
    })}



    
     const ApplyCoupon=async ()=>{

        const order_oid = param.order_oid;

        console.log(couponCode);
        console.log(order_oid);

        const formdata=new FormData()

        formdata.append("order_oid",order_oid)
        formdata.append("coupon_code",couponCode)

        try{
            const response=await axiosAPI.post("coupon/",formdata)
            fetchOrdetData()
            Swal.fire({
                "icon":response.data.icon,
                "title":response.data.message
            })
            
        }
        catch(error){
            console.log(error);
            
        }
        
        
    }
    

    const paywithStripe=(event)=>{
        setPaymentLoading(true)
        event.target.form.submit()
    }
    

    const initialOptions={
        clientId:PAYPAL_CLIENT_ID,
        currency:"USD",
        intent:"capture"
    }
    
    
    
    return(
        

<div>
    <main>
        <main className="mb-4 mt-4">
            <div className="container">
                <section className="">
                    <div className="row gx-lg-5">
                        <div className="col-lg-8 mb-4 mb-md-0">
                            <section className="">
                                <div className="alert alert-warning">
                                    <strong>Review Your Shipping &amp; Order Details </strong>
                                </div>
                                <form>
                                    <h5 className="mb-4 mt-4">Shipping address</h5>
                                    <div className="row mb-4">

                                        <div className="col-lg-12">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="form6Example2">Full Name</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    className="form-control"
                                                    value={order?.full_name || ""}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mt-4">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="form6Example2">Email</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    className="form-control"
                                                    value={order?.email || ""}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mt-4">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="form6Example2">Mobile</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    className="form-control"
                                                    value={order?.mobile || ""}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mt-4">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="form6Example2">Address</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    className="form-control"
                                                    value={order?.address || ""}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mt-4">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="form6Example2">City</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    className="form-control"
                                                    value={order?.city || ""}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mt-4">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="form6Example2">State</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    className="form-control"
                                                    value={order?.state || ""}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mt-4">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="form6Example2">Country</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    className="form-control"
                                                    value={order?.country || ""}
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <h5 className="mb-4 mt-4">Billing address</h5>
                                    <div className="form-check mb-2">
                                        <input className="form-check-input me-2" type="checkbox" defaultValue="" id="form6Example8" defaultChecked="" />
                                        <label className="form-check-label" htmlFor="form6Example8">
                                            Same as shipping address
                                        </label>
                                    </div>
                                </form>
                            </section>
                            {/* Section: Biling details */}
                        </div>
                        <div className="col-lg-4 mb-4 mb-md-0">
                            {/* Section: Summary */}
                            <section className="shadow-4 p-4 rounded-5 mb-4">
                                <h5 className="mb-3">Cart Summary</h5>
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Subtotal </span>
                                    <span>${order ? order.subtotal : 0}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Shipping </span>
                                    <span>${order ? order.shipping_amount : 0}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Tax </span>
                                    <span>${order ? order.tax_fee : 0}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Servive Fee </span>
                                    <span>${order ? order.service_fee : 0}</span>
                                </div>
                                <div className="d-flex justify-content-between text-danger fw-bold">
                                    <span>Discount </span>
                                    <span>+${order ? order.saved : 0}</span>
                                </div>
                                <hr className="my-4" />
                                <div className="d-flex justify-content-between fw-bold mb-5">
                                    <span>Total </span>
                                    <span>${order ? order.total : 0}</span>
                                </div>

                                <div className="shadow p-3 d-flex mt-4 mb-4">
                                    <input  value={couponCode} onChange={(e)=>{setCouponCode(e.target.value)}} name="couponCode" type="text" className='form-control' style={{ border: "dashed 1px gray" }} placeholder='Enter Coupon Code' id="" />
                                    <button onClick={()=>{ApplyCoupon()}} className='btn btn-success ms-1'><i className='fas fa-check-circle'></i></button>
                                </div>

                                {paymentLoading === true && 
                                 <form action={`${BASE_URL}stripe-checkout/${order?.oid}/`} method='POST'>
                                    <button onClick={paywithStripe} type="submit" disabled className="btn btn-primary btn-rounded w-100 mt-2" style={{ backgroundColor: "#635BFF" }}>
                                        Processing<i className="fas fa-spinner fa-spin"></i></button>
                                </form>
                                
                                }

                                {paymentLoading === false && 
                                 <form action={`${BASE_URL}stripe-checkout/${order?.oid}/`} method='POST'>
                                    <button onClick={paywithStripe} type="submit"  className="btn btn-primary btn-rounded w-100 mt-2" style={{ backgroundColor: "#635BFF" }}>
                                        Pay With Stripe<i className="fas fa-credit-card"></i></button>
                                </form>
                                
                                }

                               


                              
                                
                            </section>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </main>
</div>
    )
}

export default Checkout