import VendorSidebar from "./VendorSidebar";
import { Link } from "react-router-dom";
import axiosAPI from "../../Axios/axiossetup";
import VendorData from '../Plugin/VendorData'
import { useEffect, useState } from "react";
import useUserData from "../Plugin/UserData";
import moment from "moment";

function VendorReviews(){


    const [reviews,setReviews]=useState()
    const vendorid=VendorData()

    useEffect(()=>{

        axiosAPI.get(`vendor-reviews/${vendorid}/`)
        .then((res)=>{
            setReviews(res.data);         
        })

    },[vendorid])


    return(
        <div className="container-fluid" id="main">
  <div className="row row-offcanvas row-offcanvas-left h-100">
    
    <VendorSidebar/>
    {/*/col*/}
    <div className="col-md-9 col-lg-10 main mt-4">
      {!vendorid && (
  <div className="alert alert-warning text-center fw-semibold mt-3">
    You must be logged in to view this section.
  </div>
)}
      <h4>
        <i className="fas fa-star" /> Reviews and Rating
      </h4>

      <section
        className="p-4 p-md-5 text-center text-lg-start shadow-1-strong rounded"
        style={{
          backgroundImage:
            "url(https://mdbcdn.b-cdn.net/img/Photos/Others/background2.webp)"
        }}
      >
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-10">



            {reviews?.map((ritem,rindex)=>(

                    <div className="card mt-3 mb-3" key={rindex}>
              <div className="card-body m-3">
                <div className="row">
                  <div className="col-lg-4 d-flex justify-content-center align-items-center mb-4 mb-lg-0">
                    <img
                      src={ritem?.profile?.image}
                      className="rounded-circle img-fluid shadow-1"
                      alt={ritem?.profile?.full_name}
                      width={200}
                      height={200}
                      style={{objectFit:"cover"}}
                    />
                  </div>
                  <div className="col-lg-8">
                    <p className="text-dark fw-bold mb-4">
                      Review:{" "}
                      <i>
                       {ritem?.review}
                      </i>
                    </p>

                       <p className="text-dark fw-bold mb-4">
                      Reply:{" "}
                      <i>
                       {ritem?.reply === null ?
                        <span>No Reply Yet</span> :
                         <span>{ritem?.reply}</span>}
                      </i>
                    </p>
                    <p className="fw-bold text-dark mb-2">
                      <strong>Name: {ritem?.profile?.full_name}</strong>
                    </p>
                    <p className="fw-bold text-muted mb-0">
                      Product: {ritem?.product?.title}
                    </p>
                    <p className="fw-bold text-muted mb-0">
                      Rating: {ritem?.rating} 
                      {[...Array(ritem?.rating)].map((_, i) => (
  <i key={i} className="fas fa-star text-warning"></i>
))}
                    </p>
                    <div className="d-flex mt-3">
                      <p className="fw-bold text-muted mb-0">
                        <Link to={`/vendor/reviews/${ritem.id}/`} className="btn btn-primary">
                          Reply <i className="fas fa-pen" />
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            ))}
        
           
          </div>
        </div>
      </section>
    </div>
  </div>
</div>

    )
}


export default VendorReviews;