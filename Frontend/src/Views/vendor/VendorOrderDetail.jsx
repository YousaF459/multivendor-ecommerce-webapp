import VendorSidebar from "./VendorSidebar";
import { Link ,useParams} from "react-router-dom";
import axiosAPI from "../../Axios/axiossetup";
import VendorData from '../Plugin/VendorData'
import { useEffect, useState } from "react";
import moment from "moment";


function VendorOrderDetail(){

    const [orders,setOrders]=useState([])
    const [orderItems,setOrderItems]=useState([])

    const param=useParams()
    const vendorid=VendorData()



    useEffect(()=>{

     

             axiosAPI.get(`vendor/orders/${vendorid}/${param.order_oid}/`)
             .then((res)=>{
                setOrders(res.data)
                setOrderItems(res.data.orderitem)
             
             })
     
       
    },[vendorid])




    return(
       <main className="mt-5">
  <div className="container">
    <section>
      <div className="row">

        {/* Sidebar */}
        <VendorSidebar />

        <div className="col-lg-9">

          <div className="container px-4 mb-5">

            {/* ---- ORDER SUMMARY ---- */}
            <section className="mb-5">
              <h3 className="mb-4">
                <i className="fas fa-shopping-cart text-primary" /> Order ID #{orders?.oid}
              </h3>

              <div className="row gy-4 gx-xl-5">

                <div className="col-lg-3">
                  <div className="rounded shadow p-3" style={{ backgroundColor: "#B2DFDB" }}>
                    <p className="mb-1">Total</p>
                    <h2 className="mb-0">${orders?.total}</h2>
                  </div>
                </div>

                <div className="col-lg-3">
                  <div className="rounded shadow p-3" style={{ backgroundColor: "#D1C4E9" }}>
                    <p className="mb-1">Payment Status</p>
                    <h2 className="mb-0">{orders?.payment_status}</h2>
                  </div>
                </div>

                <div className="col-lg-3">
                  <div className="rounded shadow p-3" style={{ backgroundColor: "#BBDEFB" }}>
                    <p className="mb-1">Order Status</p>
                    <h2 className="mb-0">{orders?.order_status}</h2>
                  </div>
                </div>

                <div className="col-lg-3">
                  <div className="rounded shadow p-3" style={{ backgroundColor: "#bbfbeb" }}>
                    <p className="mb-1">Shipping Amount</p>
                    <h2 className="mb-0">${orders?.shipping_amount}</h2>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="rounded shadow p-3" style={{ backgroundColor: "#bbf7fb" }}>
                    <p className="mb-1">Tax Fee</p>
                    <h2 className="mb-0">${orders?.tax_fee}</h2>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="rounded shadow p-3" style={{ backgroundColor: "#eebbfb" }}>
                    <p className="mb-1">Service Fee</p>
                    <h2 className="mb-0">${orders?.service_fee}</h2>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="rounded shadow p-3" style={{ backgroundColor: "#bbc5fb" }}>
                    <p className="mb-1">Discount Fee</p>
                    <h2 className="mb-0">${orders?.saved}</h2>
                  </div>
                </div>

              </div>
            </section>

            {/* ---- ITEMS TABLE ---- */}
            <section>
              <div className="row">
                <div className="col-lg-12">
                  <div className="rounded shadow p-3">
                    <table className="table align-middle mb-0 bg-white">
                      <thead className="bg-light">
                        <tr>
                          <th>Image</th>
                          <th>Title</th>
                          <th>Price</th>
                          <th>Qty</th>
                          <th>Total</th>
                        </tr>
                      </thead>

                      <tbody>
                        {orderItems?.map((odritem, index) => (
                          <tr key={index}>
                            <td>
                              <img
                                src={odritem?.product?.image}
                                style={{ width: '75px', height: '75px', objectFit: 'cover' }}
                                alt=""
                              />
                            </td>
                            <td className="fw-normal">{odritem?.product?.title}</td>
                            <td className="fw-normal">${odritem?.price}</td>
                            <td className="fw-normal">{odritem?.qty}</td>
                            <td className="fw-normal">${odritem?.total}</td>
                          </tr>
                        ))}
                      </tbody>

                    </table>
                  </div>
                </div>
              </div>
            </section>

          </div>

        </div>

      </div>
    </section>
  </div>
</main>

    )

}
export default VendorOrderDetail;