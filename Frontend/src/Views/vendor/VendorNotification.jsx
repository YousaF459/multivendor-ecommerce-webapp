import VendorSidebar from "./VendorSidebar";
import { Link } from "react-router-dom";
import axiosAPI from "../../Axios/axiossetup";
import VendorData from '../Plugin/VendorData'
import { useEffect, useState } from "react";
import useUserData from "../Plugin/UserData";
import moment from "moment";

function VendorNotification(){

    const [notification,setNotification]=useState([])
    const [stats,setStats]=useState([])
    const vendorid=VendorData()


    const fetchNoti=async()=>{
        await axiosAPI.get(`vendor-noti-list/${vendorid}/`)
        .then(res=>{
            setNotification(res.data)
            
            
        })
    }


    const fetchNotiStats=async()=>{
        await axiosAPI.get(`vendor-noti-summary/${vendorid}/`)
        .then(res=>{
            setStats(res.data[0])
          
            
        })
    }

    useEffect(()=>{
       fetchNoti()
       fetchNotiStats()
    },[vendorid])


    const markAsSeen=async(notiID)=>{
      
        await axiosAPI.patch(`vendor-noti-mark-as-seen/${vendorid}/${notiID}/`)
        .then((res)=>{
            fetchNotiStats()
            fetchNoti()
        })
        
    }





    return(
        <div className="container-fluid" id="main">
  <div className="row row-offcanvas row-offcanvas-left h-100">
    {/* Add Sidebar Here */}

    <VendorSidebar/>
    
    <div className="col-md-9 col-lg-10 main mt-4">
      {!vendorid && (
  <div className="alert alert-warning text-center fw-semibold mt-3">
    You must be logged in to view this section.
  </div>
)}
      <div className="row mb-3">
        <div className="col-xl-4 col-lg-6 mb-2">
          <div className="card card-inverse card-success">
            <div className="card-block bg-danger p-3">
              <div className="rotate">
                <i className="bi bi-tag fa-5x" />
              </div>
              <h6 className="text-uppercase">Un-read Notification</h6>
              <h1 className="display-1">{stats?.un_read_noti}</h1>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 mb-2">
          <div className="card card-inverse card-success">
            <div className="card-block bg-success p-3">
              <div className="rotate">
                <i className="bi bi-tag fa-5x" />
              </div>
              <h6 className="text-uppercase">Read Notification</h6>
              <h1 className="display-1">{stats?.read_noti}</h1>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 mb-2">
          <div className="card card-inverse card-success">
            <div className="card-block bg-primary p-3">
              <div className="rotate">
                <i className="bi bi-tag fa-5x" />
              </div>
              <h6 className="text-uppercase">All Notification</h6>
              <h1 className="display-1">{stats?.all_noti}</h1>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row  container">
        <div className="col-lg-12">
          <h4 className="mt-3 mb-1 ">
            {" "}
            <i className="fas fa-bell m-3" /> Notifications
          </h4>
         
          <table className="table">
            <thead className="table-dark">
              <tr>
       
                <th scope="col">Type</th>
                <th scope="col">Message</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>

            {notification?.map((nitem,nindex)=>(
                <tr key={nindex}> 
             
                <td>New Order</td>
                <td>
                  You've got a new order for <b>{nitem?.order_item?.product?.title}</b>
                </td>
                <td>
                <>
  {nitem.seen ? "Read" : "Unread"}{" "}
  <i className={`fas ${nitem.seen ? "fa-eye" : "fa-eye-slash"}`}></i>
</>

                </td>
                <td>{moment(nitem.data).format("MMM DD, YYYY")}</td>
                <td>
                  <button onClick={()=>{markAsSeen(nitem.id)}}  className="btn btn-secondary mb-1">
                    <i className="fas fa-eye" />
                  </button>
                </td>
              </tr>
            ))}
              
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

    )

}


export default VendorNotification