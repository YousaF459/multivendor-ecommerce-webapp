import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useUserData from "../Plugin/UserData";
import axiosAPI from "../../Axios/axiossetup";
import moment from "moment";

function CustomerSettings(){

    const [profile,setProfile]=useState([])
    const userid=useUserData()

    const fetchProfileData=()=>{

        axiosAPI.get(`user/profile/${userid}/`)
        .then((res)=>{
            setProfile(res.data)
            
        })

    }

    useEffect(()=>{
        fetchProfileData()
    },[userid])



    const handleInputChange=(event)=>{
        setProfile({
            ...profile,
            [event.target.name]:event.target.value
        })    
    }


    const handleImageChange=(event)=>{
         setProfile({
            ...profile,
            [event.target.name]:event.target.files[0]
        })
    }

    const handleFormSubmit=async (e)=>{
        e.preventDefault()

        const formData=new FormData()

        const res=await axiosAPI.get(`user/profile/${userid}/`)

        if (profile.image != res.data.image){
            formData.append("image",profile.image)
        }

        formData.append("full_name",profile.full_name)
        formData.append("country",profile.country)
        formData.append("state",profile.state)
        formData.append("city",profile.city)
        formData.append("address",profile.address)

       try {
        await axiosAPI.patch(`user/profile/${userid}/`,formData,{
            headers:{
                "Content-Type":'multipart/form-data'
            }
        })

        fetchProfileData(); 
       } catch (error) {
        
       }
        
    }







    return(
        <main className="mt-5">
  <div className="container">
    <section className="">
      <div className="row">
        {/* <Sidebar /> */}

        <Sidebar/>

        <div className="col-lg-9 mt-1">
          {!userid && (
  <div className="alert alert-warning text-center fw-semibold mt-3">
    You must be logged in to view this section.
  </div>
)}
          <section className="">
            <main className="mb-5" style={{}}>
              <div className="container px-4">
                <section className="">
                  <h3 className="mb-3">
                    {" "}
                    <i className="fas fa-gear fa-spin" /> Settings{" "}
                  </h3>
                  <form encType="multipart/form-data" onSubmit={handleFormSubmit}>
                    <div className="row">


                        <div className="col-lg-12 mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Profile Image
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          aria-describedby="emailHelp"
                          onChange={handleImageChange}
                          name='image'
                        />
                      </div>


                      <div className="col-lg-12">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          aria-describedby="emailHelp"
                          value={profile?.full_name}
                          onChange={handleInputChange}
                          name="full_name"
                        />
                      </div>
                      <div className="col-lg-6 mt-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          aria-describedby="emailHelp"
                          value={profile?.user?.email}
                          readOnly
                        />
                      </div>
                      <div className="col-lg-6 mt-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Mobile
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          aria-describedby="emailHelp"
                          value={profile?.user?.phone}
                          readOnly
                        />
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-lg-6">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          aria-describedby="emailHelp"
                          value={profile?.address}
                          onChange={handleInputChange}
                          name="address"
                        />
                      </div>
                      <div className="col-lg-6 mt-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          aria-describedby="emailHelp"
                          value={profile?.city}
                          onChange={handleInputChange}
                          name="city"
                        />
                      </div>
                      <div className="col-lg-6 mt-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          State
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          aria-describedby="emailHelp"
                          value={profile?.state}
                          onChange={handleInputChange}
                          name="state"
                        />
                      </div>
                      <div className="col-lg-6 mt-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          aria-describedby="emailHelp"
                          value={profile?.country}
                          onChange={handleInputChange}
                          name="country"
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-5">
                      Save Changes
                    </button>
                  </form>
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

export default CustomerSettings