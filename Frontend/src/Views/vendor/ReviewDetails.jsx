import VendorSidebar from "./VendorSidebar";
import { Link ,useParams} from "react-router-dom";
import axiosAPI from "../../Axios/axiossetup";
import VendorData from '../Plugin/VendorData'
import { useEffect, useState } from "react";
import useUserData from "../Plugin/UserData";

function ReviewDetail(){

    const [review,setReviews]=useState()
    const [updateReview,setUpdateReview]=useState({reply:""})

    const vendorid=VendorData()
    const param=useParams()

    useEffect(()=>{

        if(vendorid){
            axiosAPI.get(`vendor-reviews/${vendorid}/${param.review_id}/`)
        .then((res)=>{
            setReviews(res.data);    
                
                
        })
        }
        

    },[vendorid,param.review_id])

    const handleReplyChange=(event)=>{

        setUpdateReview({
            ...updateReview,
            [event.target.name]:event.target.value
        })
       
    }


    const handleReplySubmit=async(e)=>{
        e.preventDefault()

        const formData=new FormData()
        formData.append('reply',updateReview.reply)


        await axiosAPI.patch(`vendor-reviews/${vendorid}/${param.review_id}/`,formData)
        .then(res =>{
                setReviews(res.data)
        })
        
        axiosAPI.get(`vendor-reviews/${vendorid}/${param.review_id}/`)
        .then((res)=>{
            setReviews(res.data);    
              
                
        })
    }





    return(

            <div className="container-fluid" id="main">
  <div className="row row-offcanvas row-offcanvas-left h-100">
    
    <VendorSidebar/>
    {/*/col*/}
    <div className="col-md-9 col-lg-10 main mt-4">
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



          

                    <div className="card mt-3 mb-3" >
              <div className="card-body m-3">
                <div className="row">
                  <div className="col-lg-4 d-flex justify-content-center align-items-center mb-4 mb-lg-0">
                    <img
                      src={review?.profile?.image}
                      className="rounded-circle img-fluid shadow-1"
                      alt={review?.profile?.full_name}
                      width={200}
                      height={200}
                      style={{objectFit:"cover"}}
                    />
                  </div>
                  <div className="col-lg-8">

                    <p className="text-dark fw-bold mb-4">
                      Review:{" "}
                      <i>
                       {review?.review}
                      </i>
                    </p>

                    <p className="text-dark fw-bold mb-4">
                      Reply:{" "}
                      <i>
                       {review?.reply === null ?
                        <span>No Reply Yet</span> :
                         <span>{review?.reply}</span>}
                      </i>
                    </p>

                    <p className="fw-bold text-dark mb-2">
                      <strong>Name: {review?.profile?.full_name}</strong>
                    </p>
                    <p className="fw-bold text-muted mb-0">
                      Product: {review?.product?.title}
                    </p>
                    <p className="fw-bold text-muted mb-0">
                      Rating: {review?.rating} 
                     


                    </p>
                     <p className="fw-bold text-muted mb-0 ">
                      Rating: {review?.rating} 
                      {[...Array(review?.rating)].map((_, i) => (
  <i key={i} className="fas fa-star text-warning ms-1"></i>
))}
                    </p>


                    <div className="mt-3">
                        <form action="" className="d-flex" onSubmit={handleReplySubmit}>
                        <input value={updateReview.reply} name="reply" onChange={handleReplyChange} type="text" placeholder="Write Your Reply..." className="form-control" />
                        <button className="btn btn-success ms-2" type="submit"><i className="fas fa-paper-plane"></i></button>

                        </form>
                    </div>


                   

                  </div>
                </div>
              </div>
            </div>

         
        
           
          </div>
        </div>
      </section>
    </div>
  </div>
</div>
    )

}

export default ReviewDetail