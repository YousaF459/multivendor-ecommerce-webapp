import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useUserData from "../Plugin/UserData";
import axiosAPI from "../../Axios/axiossetup";
import Swal from "sweetalert2";

function Wishlist(){

    const [wishlist,setWishlist]=useState([])
    const userData=useUserData()


    const fethcWishlist=()=>{
         axiosAPI.get(`customer/wishlist/${userData}/`)
        .then((res)=>{
            setWishlist(res.data)
            
        })
    }


     useEffect(()=>{
       fethcWishlist()
       },[userData])

    const addtoWishlist=async (product)=>{

          if(userData){
    
            try {

              const formData=new FormData()
    
            formData.append("product_id",product.id)
            formData.append("user_id",userData)
    
            const response=await  axiosAPI.post(`customer/wishlist/${userData}/`,formData)
    
            Swal.fire({
              "icon":"success",
              "title":response.data.message
            })
             fethcWishlist()
            
              
            } catch (error) {
           
              
            }
            
        
    
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
                    {!userData && (
  <div className="alert alert-warning text-center fw-semibold mt-3">
    You must be logged in to view this section.
  </div>
)}
                    <section className="">
                        <main className="mb-5" style={{}}>
                            <div className="container">
                                <section className="">
                                    <div className="row">
                                        <h3 className="mb-3">
                                            <i className="fas fa-heart text-danger" /> Wishlist
                                        </h3>



                                        
                                         {wishlist.map((w,index)=>(
           
            <div className="col-lg-4 col-md-12 mb-4" key={index}>
            <div className="card">
              <div
                className="bg-image hover-zoom ripple"
                data-mdb-ripple-color="light"
              >
                <Link to={`/detail/${w.product?.slug}`}>
                <img
                  src={w.product?.image}
                  className="w-100"
                  style={{width:"100%",height:200,objectFit:"cover"}}
                />
                </Link>
                
              </div>
              <div className="card-body">

                <Link to={`/detail/${w.product?.slug}`} className="text-reset">
                  <h5 className="card-title mb-3">{w.product?.title}</h5>
                </Link>

                <a href="" className="text-reset">
                  <p>{w.product?.category.title}</p>
                </a>

                <div className="d-flex ">
                <h6 className="mb-3">${w.product?.price}</h6>
                <h6 className="mb-3 text-muted ps-2"><strike>${w.product?.old_price}</strike></h6>
                </div>

                <div className="btn-group">
                   <button
                   onClick={()=>{addtoWishlist(w.product)}}
                type="button"
                className="btn btn-danger px-3 me-1 mb-1 ms-2">
                    <i className="fas fa-heart" />
                    </button>
                  
                </div>



              </div>
            </div>

            </div>

        ))}


                {wishlist.length <1 && 
              
                                        <h6 className='container'>Your wishlist is Empty </h6>
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


export default Wishlist