import VendorSidebar from "./VendorSidebar";
import { Link } from "react-router-dom";
import axiosAPI from "../../Axios/axiossetup";
import VendorData from '../Plugin/VendorData'
import { useEffect, useState } from "react";
import moment from "moment";


function VendorOrders(){

    const [orders,setOrders]=useState([])
    const vendorid=VendorData()

    
    useEffect(()=>{
        if(vendorid){

            axiosAPI.get(`vendor/orders/${vendorid}/`)
            .then((res)=>{
                setOrders(res.data)
                console.log(res.data);
                
            })

        }
    },[vendorid])


    const handleFilterOrders=async(filter)=>{
     

      const res=await axiosAPI.get(`vendor/orders/filter/${vendorid}?filter=${filter}`)
      setOrders(res.data)
    }




    return(
    <div className="container-fluid" id="main">
  <div className="row row-offcanvas row-offcanvas-left h-100">

    {/* Sidebar */}
    <VendorSidebar />

    <div className="col-md-9 col-lg-10 main mt-4">
      {!vendorid && (
  <div className="alert alert-warning text-center fw-semibold mt-3">
    You must be logged in to view this section.
  </div>
)}
      {/* Page Title */}
      <h4 className="fw-bold mb-3 d-flex align-items-center gap-2">
        <i className="bi bi-cart-check-fill"></i> 
        All Orders
      </h4>

      {/* Filter Dropdown */}
      <div className="dropdown mb-4">
        <button
          className="btn btn-outline-dark dropdown-toggle btn-sm"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fas fa-sliders me-2"></i>
          Filter
        </button>

        <ul className="dropdown-menu shadow-sm" aria-labelledby="dropdownMenuButton1">
          <li className="dropdown-header fw-bold text-secondary">Payment Status</li>
          <li><a className="dropdown-item"  onClick={()=>handleFilterOrders("paid")}>Paid</a></li>
          <li><a className="dropdown-item"  onClick={()=>handleFilterOrders("processing")}>Processing</a></li>
          <li><a className="dropdown-item"  onClick={()=>handleFilterOrders("pending")}>Pending</a></li>
          <li><a className="dropdown-item"  onClick={()=>handleFilterOrders("cancelled")}>Cancelled</a></li>
          <hr className="dropdown-divider" />

          <li className="dropdown-header fw-bold text-secondary">Date</li>
          <li><a className="dropdown-item"  onClick={()=>handleFilterOrders("latest")}>Latest</a></li>
          <li><a className="dropdown-item"  onClick={()=>handleFilterOrders("oldest")}>Oldest</a></li>
          <hr className="dropdown-divider" />

          <li className="dropdown-header fw-bold text-secondary">Order Status</li>
          <li><a className="dropdown-item" onClick={()=>handleFilterOrders("Pending")}>Pending</a></li>
          <li><a className="dropdown-item" onClick={()=>handleFilterOrders("Fulfilled")}>FullFilled</a></li>
          <li><a className="dropdown-item" onClick={()=>handleFilterOrders("Cancelled")}>Cancelled</a></li>
       
        </ul>
      </div>

      {/* Orders Table */}
      <table className="table table-bordered table-hover align-middle shadow-sm">
        <thead className="table-dark text-center">
          <tr>
            <th>#Order ID</th>
            <th>Total</th>
            <th>Payment Status</th>
            <th>Order Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody className="text-center">


        {orders?.map((oditem,odindex)=>(
            <tr key={odindex}>
            <td>#{oditem?.oid}</td>
            <td>${oditem?.total}</td>
            <td><span className="badge bg-success">{oditem?.payment_status.toUpperCase()}</span></td>
            <td><span className="badge bg-primary">{oditem?.order_status.toUpperCase()}</span></td>
            <td>{moment(oditem.date).format("MMM D, YYYY")}</td>
            <td>
              <Link to={`/vendor/orders/${oditem.oid}/`} className="btn btn-sm btn-primary">
                <i className="fas fa-eye"></i>
              </Link>
            </td>
          </tr>

        ))}
          



        </tbody>
      </table>

    </div>
  </div>
</div>




    )
}


export default VendorOrders;