import VendorSidebar from "./VendorSidebar";
import { Link } from "react-router-dom";
import axiosAPI from "../../Axios/axiossetup";
import VendorData from '../Plugin/VendorData'
import { useEffect, useState } from "react";
import useUserData from "../Plugin/UserData";
import moment from "moment";
import Swal from "sweetalert2";


function VendorCoupon(){


    const [stats,setStats]=useState([])
    const [coupon,setCoupon]=useState([])
    const [createCoupon,setCreateCoupon]=useState({
        code:"",
        discount:"",
        active:true
    })

    const vendorid=VendorData()

    const fethcCouponData=async()=>{

        
             await axiosAPI.get(`vendor-coupon-stats/${vendorid}/`)
        .then(res=>{
            setStats(res.data[0]);  
           
        })
       

        await axiosAPI.get(`vendor-coupon-list/${vendorid}/`)
        .then(res=>{
            setCoupon(res.data);  
           
             
        })
       
    }

    useEffect(()=>{
        fethcCouponData()
       
    },[vendorid])


    const handleDeleteCoupon=async(coupon_id)=>{
       await axiosAPI.delete(`vendor-coupon-detail/${vendorid}/${coupon_id}/`)
       fethcCouponData()
       
    }



    const handleCouponChange=(event)=>{
        setCreateCoupon({
            ...createCoupon,
            [event.target.name]:event.target.type === "checkbox" ? event.target.checked : event.target.value
        })
      
        
    }


    const handleCreateCoupon =async (e)=>{
        e.preventDefault()
       

        const formdata=new FormData()

        formdata.append('vendor_id',vendorid)
        formdata.append('code',createCoupon.code)
        formdata.append('discount',createCoupon.discount)
        formdata.append('active',createCoupon.active)


       
        

        await axiosAPI.post(`vendor-coupon-list/${vendorid}/`,formdata) 
        .then(res=>{
            fethcCouponData()
            Swal.fire({
                icon:"success",
                title:"Coupon Created Successfully"
            })
            
        })
        
    }


    return(
       <>
      <div className="container-fluid" id="main">
        <div className="row h-100">
          <VendorSidebar />

          <div className="col-md-9 col-lg-10 main mt-4">
            {!vendorid && (
  <div className="alert alert-warning text-center fw-semibold mt-3">
    You must be logged in to view this section.
  </div>
)}
            {/* Stats Row */}
            <div className="row mb-4">
              <div className="col-xl-6 col-lg-6 mb-3">
                <div className="card shadow-sm border-0">
                  <div className="card-body bg-success text-white rounded">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-tag fs-1 me-3"></i>
                      <div>
                        <h6 className="text-uppercase mb-1">Total Coupons</h6>
                        <h1 className="display-6">
                          {stats?.total_coupons ?? 0}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 mb-3">
                <div className="card shadow-sm border-0">
                  <div className="card-body bg-danger text-white rounded">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-check-circle fs-1 me-3"></i>
                      <div>
                        <h6 className="text-uppercase mb-1">Active Coupons</h6>
                        <h1 className="display-6">
                          {stats?.active_coupons ?? 0}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            {/* Coupon Table */}
            <div className="row">
              <div className="col-lg-12">
                <h4 className="mb-4">
                  <i className="bi bi-tag me-2"></i>Coupons
                </h4>

                <button
                  className="btn btn-success mb-3"
                  data-bs-toggle="modal"
                  data-bs-target="#createCouponModal"
                >
                  <i className="bi bi-plus-circle me-2"></i> Create Coupon
                </button>

                <table className="table table-hover table-bordered shadow-sm">
                  <thead className="table-dark">
                    <tr>
                      <th>Code</th>
                      <th>Type</th>
                      <th>Discount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {coupon?.map((citem, cindex) => (
                      <tr key={cindex}>
                        <td>{citem?.code}</td>
                        <td>Percentage</td>
                        <td>{citem?.discount}%</td>
                        <td>
                          {citem.active === true ? "Active" : "Inactive"}
                        </td>
                        <td>
                    
                          <Link to={`/vendor/coupon/${citem.id}`} className="btn btn-primary btn-sm me-1 ms-2">
                            <i className="fas fa-edit"></i>
                          </Link>
                          <button
                            onClick={() => {
                              handleDeleteCoupon(citem.id);
                            }}
                            className="btn btn-danger btn-sm ms-2"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}

                    {coupon.length < 1 && (
                      <tr>
                        <td colSpan="5" className="text-center p-3 fw-bold">
                          No Coupons
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CREATE COUPON MODAL */}
      <div className="modal fade" id="createCouponModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Create Coupon</h5>
              <button
                type="button"
                id="closeCreateModal"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label" htmlFor="code">Coupon Code</label>
                <input
                id='code'
                  type="text"
                  name="code"
                  className="form-control"
                  value={createCoupon.code}
                  onChange={handleCouponChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="discount">Discount (%)</label>
                <input
                id='discount'
                  type="number"
                  name="discount"
                  className="form-control"
                  value={createCoupon.discount}
                  onChange={handleCouponChange}
                />
              </div>

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="active"
                  checked={createCoupon.active}
                  onChange={handleCouponChange}
                />
                <label className="form-check-label">Active</label>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCreateCoupon}
              >
                Create
              </button>
            </div>

          </div>
        </div>
      </div>


    </>


    )

}

export default VendorCoupon;