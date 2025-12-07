
import Sidebar from "./Sidebar"
import useUserData from "../Plugin/UserData"
import moment from "moment"
import { useParams ,Link} from "react-router-dom"
import axiosAPI from "../../Axios/axiossetup"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

function CustomerNotification(){

    const [notification,setNotification]=useState([])

    const userid=useUserData()

    const fetchNoti=()=>{
        if(userid){

            axiosAPI.get(`customer/notification/${userid}/`)
        .then((res)=>{
            setNotification(res.data)
        })
    
       
        
        }
    }

    useEffect(()=>{
        fetchNoti()
    },[userid])


    const MarkNotIsSeen=(notiId)=>{

        if(userid){
    
            axiosAPI.get(`customer/notification/${userid}/${notiId}/`)
        .then((res)=>{
            fetchNoti() 
            
        Swal.fire({
            "icon":"success",
            "title":"Notification Marked As Seen"
        })
       
        })

        }  
    }



    return(
        <main className="mt-5">
  <div className="container">
    <section className="">
      <div className="row">
        {/* Sidebar Here */}
<Sidebar/>
        <div className="col-lg-9 mt-1">
   
          <section className="">
            <main className="mb-5" style={{}}>
              <div className="container px-4">
                  {!userid && (
  <div className="alert alert-warning text-center fw-semibold mt-3">
    You must be logged in to view this section.
  </div>
)}
                <section className="">
                  <h3 className="mb-3">
                    <i className="fas fa-bell" /> Notifications{" "}
                  </h3>
                  <div className="list-group m-2">

                {notification?.map((nitem,nindex)=>(

                     <a
                      href="#"
                      className="list-group-item list-group-item-action active mb-3"
                      aria-current="true"
                      key={nindex}
                    >
                      <div className="d-flex w-100 justify-content-between mb-2">
                        <h5 className="mb-1">Order Confirmed</h5>
                        <small>{moment(nitem.date).format("MMM D, YYYY")}</small>
                      </div>
                      <p className="mb-1">
                        Your Order has been confirmed
                      </p>
                     
                        <button onClick={()=>{MarkNotIsSeen(nitem.id)}} className="btn btn-success mt-3"><i className="fas fa-eye"></i></button>

                    </a>

                ))}


                {notification.length <1 && 
                <h4 className="p-4">No Notifications Yet</h4>
                }

                   

                

                  </div>
                </section>
              </div>
            </main>
          </section>
        </div>
      </div>
    </section>
  </div>
</main>

    )

}


export default CustomerNotification;