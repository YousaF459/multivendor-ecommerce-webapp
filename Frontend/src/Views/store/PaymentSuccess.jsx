import { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import axiosAPI from "../../Axios/axiossetup";


function PaymentSuccess(){

    const [order,setOrder]=useState([])
    const [status,setStatus]=useState("Verifying")

    const param=useParams()

    const urlParam=new URLSearchParams(window.location.search)
    

    const sessionId=urlParam.get('session_id')


    useEffect(()=>{
        axiosAPI.get(`checkout/${param.order_oid}/`)
        .then(res=>{
            setOrder(res.data);
            return res.data
        })
       
    },[])


    useEffect(()=>{
       const formData=new FormData()

       formData.append("session_id",sessionId)
       formData.append("order_oid",param.order_oid)

        setStatus("Verifying")

        
        
        

        axiosAPI.post(`payment-success/${param?.order_oid}/`,formData)
        .then(res=>{
            if(res.data.message == "Payment Successfull"){
                setStatus("Payment Successfull")
            }
            if(res.data.message == "Your Invoice is UnPaid"){
                setStatus("Your Invoice is UnPaid")
            }
            if(res.data.message == "Your Invoice was Cancelled"){
                setStatus("Your Invoice was Cancelled")
            }
            if(res.data.message == "Already Paid"){
                setStatus("Already Paid")
            }
            
        })

    },[])

    
    

    return(
        <div>
  <main className="mb-4 mt-4 h-100">
    <div className="container">
      {/* Section: Checkout form */}
      <section className="">
        <div className="gx-lg-5">
          <div className="row pb50">
            <div className="col-lg-12">
              <div className="dashboard_title_area">
                <h4 className="fw-bold text-center mb-4 mt-4">
                  Checkout Successfull <i className="fas fa-check-circle" />{" "}
                </h4>
                {/* <p class="para">Lorem ipsum dolor sit amet, consectetur.</p> */}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="application_statics">
                <div className="account_user_deails dashboard_page">
                  <div className="d-flex justify-content-center align-items-center">
                    

                    {status === 'Verifying' && 

                    <div className="col-lg-12">
                      <div className="border border-3 border-success" />
                      <div className="card bg-white shadow p-5">
                        <div className="mb-4 text-center">
                          <i
                            className="fas fa-check-circle text-success"
                            style={{ fontSize: 100, color: "green" }}
                          />
                        </div>
                        <div className="text-center">
                          <h1>Payment Verifying <i className="fas fa-spinner fa-spin"></i></h1>
                          <p className="text-center">
                            Please Wait While we Verify Your Payment
                            <br />
                            <b className="text-danger">Note: Do not Relaod or Leave the Page</b>
                          </p>
                          
                        </div>
                      </div>
                    </div>

                    }


                    {status === 'Your Invoice is UnPaid' && 

                    <div className="col-lg-12">
                      <div className="border border-3 border-success" />
                      <div className="card bg-white shadow p-5">
                        <div className="mb-4 text-center">
                          <i
                            className="fas fa-check-circle text-success"
                            style={{ fontSize: 100, color: "green" }}
                          />
                        </div>
                        <div className="text-center">
                          <h1> UnPaid Invoice <i className="fas fa-ban text-danger"></i></h1>
                          <p className="text-center">
                            
                            <b className="text-danger">Note:Please Try Making Payment Again</b>
                          </p>
                          
                        </div>
                      </div>
                    </div>

                    }

                   

                    {status === 'Payment Successfull' && 

                    <div className="col-lg-12">
                      <div className="border border-3 border-success" />
                      <div className="card bg-white shadow p-5">
                        <div className="mb-4 text-center">
                          <i
                            className="fas fa-check-circle text-success"
                            style={{ fontSize: 100, color: "green" }}
                          />
                        </div>
                        <div className="text-center">
                          <h1>Thank You !</h1>
                          <p>
                            Thank Your For YourPurchase.Please Note your OrderId = <b>{order.oid}</b> <br />
                            We Have Sent Order Summary To Your Linked Email <b>{order.email}</b>
                          </p>
                          <button
                            className="btn btn-success mt-3"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            View Order <i className="fas fa-eye" />{" "}
                          </button>
                          <a
                            href="/"
                            className="btn btn-primary mt-3 ms-2"
                          >
                            Download Invoice{" "}
                            <i className="fas fa-file-invoice" />{" "}
                          </a>
                          <a
                            className="btn btn-secondary mt-3 ms-2"
                          >
                            Go Home <i className="fas fa-fa-arrow-left" />{" "}
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    }       


                     {status === 'Already Paid' && 

                    <div className="col-lg-12">
                      <div className="border border-3 border-success" />
                      <div className="card bg-white shadow p-5">
                        <div className="mb-4 text-center">
                          <i
                            className="fas fa-check-circle text-success"
                            style={{ fontSize: 100, color: "green" }}
                          />
                        </div>
                        <div className="text-center">
                          <h1>Already Paid</h1>
                          <p>
                            Thank Your For YourPurchase.Please Note your OrderId = <b>{order.oid}</b> <br />
                            We Have Sent Order Summary To Your Linked Email <b>{order.email}</b>
                          </p>
                          <button
                            className="btn btn-success mt-3"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            View Order <i className="fas fa-eye" />{" "}
                          </button>
                          <a
                            href="/"
                            className="btn btn-primary mt-3 ms-2"
                          >
                            Download Invoice{" "}
                            <i className="fas fa-file-invoice" />{" "}
                          </a>
                          <Link to={"/"}
                            className="btn btn-secondary mt-3 ms-2"
                          >
                            Go Home <i className="fas fa-fa-arrow-left" />{" "}
                          </Link>
                        </div>
                      </div>
                    </div>
                    
                    }                 

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
  <div
    className="modal fade"
    id="exampleModal"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Order Summary
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <div className="modal-body text-start text-black p-4">
            <h5
              className="modal-title text-uppercase "
              id="exampleModalLabel"
            >
              {order.full_name}
            </h5>
            <h6>{order.email}</h6>
            <h6>{order.mobile}</h6>
            <br />
            <h6 className="mb-5">{order.address} - {order.state} <br /> {order.city} - {order.country}</h6>
            <p className="mb-0" style={{ color: "#35558a" }}>
              Payment summary
            </p>
            <hr
              className="mt-2 mb-4"
              style={{
                height: 0,
                backgroundColor: "transparent",
                opacity: ".75",
                borderTop: "2px dashed #9e9e9e"
              }}
            />
            <div className="d-flex justify-content-between">
              <p className="fw-bold mb-0">Subtotal</p>
              <p className="text-muted mb-0">${order.sub_total}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="small mb-0">Shipping Fee</p>
              <p className="small mb-0">${order.shipping_amount}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="small mb-0">Service Fee</p>
              <p className="small mb-0">${order.service_fee}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="small mb-0">Tax</p>
              <p className="small mb-0">${order.tax_fee}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="small mb-0">Discount</p>
              <p className="small mb-0">-${order.saved}</p>
            </div>
            <div className="d-flex justify-content-between mt-4">
              <p className="fw-bold">Total</p>
              <p className="fw-bold" style={{ color: "#35558a" }}>
                ${order.total}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>
    )
}

export default PaymentSuccess;