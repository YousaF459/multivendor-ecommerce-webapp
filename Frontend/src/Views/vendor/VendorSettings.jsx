import VendorSidebar from "./VendorSidebar";
import { Link } from "react-router-dom";
import axiosAPI from "../../Axios/axiossetup";
import VendorData from '../Plugin/VendorData'
import { useEffect, useState } from "react";
import useUserData from "../Plugin/UserData";
import moment from "moment";
import Swal from "sweetalert2";


function VendorSettings(){

    const [profileData,setProfileData]=useState([])
    const [profileImage,setProfileImage]=useState("")
    const [vendorImage,setVendorImage]=useState("")
    const [vendorData,setVendorData]=useState([])


    const vendorid=VendorData()


    const fetchProfileData=()=>{
           axiosAPI.get(`vendor-settings/${vendorid}/`)
        .then(res=>{
            setProfileData(res.data);
            setProfileImage(res.data.image)
        })
    }

   
    const handleInputChange=(event)=>{
        setProfileData({
            ...profileData,
            [event.target.name]:event.target.value
        })
      
        
    }




    const handleVendorChange=(event)=>{
        setVendorData({
            ...vendorData,
            [event.target.name]:event.target.value
        })
        
        
    }

      const handleVendorFileChange=(event)=>{
        setVendorData({
            ...vendorData,
            [event.target.name]:event.target.files[0]
        })
       
        
    }






    const handleFileChange=(event)=>{
        setProfileData({
            ...profileData,
            [event.target.name]:event.target.files[0]
        })
        
        
    }


    const handleProfileSubmit=async(e)=>{
        e.preventDefault()


        const formdata=new FormData()
        const res=await axiosAPI.get(`vendor-settings/${vendorid}/`)
        if(profileData.image != res.data.image){
            formdata.append("image",profileData.image)
        }
        
        formdata.append("full_name",profileData.full_name)
        formdata.append("about",profileData.about)
        
        await axiosAPI.patch(`vendor-settings/${vendorid}/`,formdata,{
            headers:{
                "Content-Type":"multi-part/form-data"
            }
        })

        fetchProfileData()

        Swal.fire({
            "icon":"success",
            "title":"Profile Updated Successfully"
        })
        
    }


    const fetchVendorData=()=>{
        axiosAPI.get(`vendor-shop-settings/${vendorid}/`)
        .then(res=>{
            setVendorData(res.data)
            setVendorImage(res.data.image)
        
            
        })
    }



     const handleShopSubmit=async(e)=>{
        e.preventDefault()
        const formdata=new FormData()
        const res=await axiosAPI.get(`vendor-shop-settings/${vendorid}/`)
        if(vendorData.image != res.data.image){
            formdata.append("image",vendorData.image)
        }
        
        formdata.append("name",vendorData.name)
        formdata.append("email",vendorData.email)
        formdata.append("description",vendorData.description)
        
        await axiosAPI.patch(`vendor-shop-settings/${vendorid}/`,formdata,{
            headers:{
                "Content-Type":"multi-part/form-data"
            }
        })

        fetchVendorData()

        Swal.fire({
            "icon":"success",
            "title":"Shop Updated Successfully"
        })
        
    }

 

     useEffect(()=>{
     fetchProfileData()
     fetchVendorData()
    },[vendorid])





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
      <div className="container">
        <div className="main-body">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                Profile
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                Shop
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <div className="row gutters-sm shadow p-4 rounded">
                <div className="col-md-4 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center text-center">
                        <img
                          src={profileImage || null}
                          style={{ width: 160, height: 160, objectFit: "cover" }}
                          alt="Admin"
                          className="rounded-circle"
                          width={150}
                        />
                        <div className="mt-3">
                          <h4 className="text-dark">{profileData?.full_name || ""}</h4>
                          <p className="text-secondary mb-1">{profileData?.about || ""}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card mb-3">
                    <div className="card-body">
                      <form
                        className="form-group"
                        method="POST"
                        noValidate=""
                        encType="multipart/form-data"
                        onSubmit={handleProfileSubmit}
                      >
                        <div className="row text-dark">
                          <div className="col-lg-6 mb-2">
                            <label htmlFor="" className="mb-2">
                              Profile Image
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              name="image"
                              id=""
                              onChange={handleFileChange}
                            />
                          </div>
                          <div className="col-lg-6 mb-2 ">
                            <label htmlFor="" className="mb-2">
                              Full Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="full_name"
                              id=""
                              value={profileData?.full_name || ""}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-lg-6 mb-2">
                            <label htmlFor="" className="mb-2">
                              Email
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name=""
                              id=""
                              value={profileData?.user?.email || ""}
                              readOnly 
                            />
                          </div>
                          <div className="col-lg-6 mb-2">
                            <label htmlFor="" className="mb-2">
                              Phone Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name=""
                              id=""
                              value={profileData?.user?.phone || ""}
                              readOnly
                            />
                          </div>
                    
                          
                          <div className="col-lg-6 mt-4 mb-3">
                            <button className="btn btn-success" type="submit">
                              Update Profile <i className="fas fa-check-circle" />{" "}
                            </button>
                          </div>

                        <div className="col-lg-6 mb-2">
                            About
  <textarea
    name="about"
    className="form-control"
    value={profileData?.about || ""}
    rows={5} 
    placeholder="Write something about yourself"
    onChange={handleInputChange}
  ></textarea>
</div>

                        </div>
                      </form>



                    </div>
                  </div>
                </div>
              </div>
            </div>




            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div className="row gutters-sm shadow p-4 rounded">
                <div className="col-md-4 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center text-center">
                        <img
                          src={vendorImage || null}
                          style={{ width: 160, height: 160, objectFit: "cover" }}
                          alt="Admin"
                          className="rounded-circle"
                          width={150}
                          
                        />
                        <div className="mt-3">
                          <h4 className="text-dark">{vendorData?.name || ""}</h4>
                          <p className="text-secondary mb-1">{vendorData?.description || ""}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card mb-3">
                    <div className="card-body">
                      <form
                        className="form-group"
                        method="POST"
                        noValidate=""
                        encType="multipart/form-data"
                        onSubmit={handleShopSubmit}
                      >
                        <div className="row text-dark">
                          <div className="col-lg-12 mb-2">
                            <label htmlFor="" className="mb-2">
                              Shop Image
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              name="image"
                              id=""
                              onChange={handleVendorFileChange}
                            />
                          </div>
                          <div className="col-lg-12 mb-2 ">
                            <label htmlFor="" className="mb-2">
                              Shop Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              id=""
                              value={vendorData?.name || ""}
                              onChange={handleVendorChange}
                            />
                          </div>
                          <div className="col-lg-6 mb-2">
                            <label htmlFor="" className="mb-2">
                              Email
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="email"
                              id=""
                              value={vendorData?.user?.email || ""}
                              readOnly
                            />
                          </div>
                          <div className="col-lg-6 mb-2">
                            <label htmlFor="" className="mb-2">
                              Phone Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="mobile"
                              id=""
                              value={vendorData?.mobile || ""}
                              readOnly
                            />
                          </div>


                            <div className="col-lg-12 mb-3">
  <label htmlFor="shopDescription" className="mb-2">
    Shop Description
  </label>
  <textarea
    id="shopDescription"
    name="description"
    className="form-control"
    onChange={handleVendorChange}
    value={vendorData?.description || ""}   // controlled input
    rows={5}   // makes it taller
    placeholder="Write something about your shop..."
    style={{ resize: "vertical" }}  // allows vertical resizing only
  ></textarea>
</div>


                          <div className="col-lg-6 mt-4 mb-3 ">
                            <button  className="btn btn-success mt-2" type="submit">
                              Update Shop <i className="fas fa-check-circle" />{" "}
                            </button>
                            <Link className="btn btn-primary ms-2 mt-2" to={`/vendor/${vendorData.slug}/`}>
                              View Shop <i className="fas fa-shop" />{" "}
                            </Link>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>




          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    )
}

export default VendorSettings