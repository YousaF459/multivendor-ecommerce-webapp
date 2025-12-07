import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useUserData from "../Plugin/UserData";
import axiosAPI from "../../Axios/axiossetup";

function Account(){



  
    const [profile,setProfile]=useState({})

    const userData=useUserData()

    
    

    useEffect(()=>{
        if (userData){
             axiosAPI.get(`user/profile/${userData}/`)
        .then(res=>{

            setProfile(res.data)
            
        })
        }
        
       

    },[userData])

    return(
        <>
        <main className="mt-5">
  <div className="container">
    <section className="">
      <div className="row">
        <Sidebar></Sidebar>
        <div className="col-lg-9 mt-1">
          {!userData && (
  <div className="alert alert-warning text-center fw-semibold mt-3">
    You must be logged in to view this section.
  </div>
)}
          <main className="mb-5" style={{}}>
            <div className="container px-4">
              <section className=""></section>
              <section className="">
                <div className="row rounded shadow p-3">
                  <h2>Hi {profile.full_name}, </h2>
                  <div className="col-lg-12 mb-4 mb-lg-0 h-100">
                    From your account dashboard. you can easily check &amp;
                    view your <a href="">orders</a>, manage your{" "}
                    <a href="">
                      shipping
                    </a>
                    <a href="">Edit Account</a>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </section>
  </div>
</main>
        </>

    )


}


export default Account;