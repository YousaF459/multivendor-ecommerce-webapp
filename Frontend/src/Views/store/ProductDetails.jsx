import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosAPI from "../../Axios/axiossetup";
import GetCurrentAddress from "../Plugin/UserCountry";
import useUserData from "../Plugin/UserData"
import CartID from "../Plugin/CartID"
import moment from "moment";
import Swal from "sweetalert2"
import { useContext } from "react";
import { CartContext } from "../Plugin/Context";


function ProductDetails(){

    const { count, setCount, cartCount, setCartCount } = useContext(CartContext);


    const [product,setproduct]=useState({})
    const [specification,setSpecification]=useState([])
    const [size,setSize]=useState([])
    const [colors,setColors]=useState([])
    const [gallery,setGallery]=useState([])
    const [reviews,setReviews]=useState([])
    const [createReview,setCreateReview]=useState({
        user_id:0,product_id:product?.id,review:"",rating:0
    })

    const [colorSelected,setColorSelected]=useState("No Color")
    const [sizeSelected,setSizeSelected]=useState("No Size")
    const [getQty,SetgetQty]=useState(1)

    const param=useParams()
    const currentAddress=GetCurrentAddress()
    const UserId=useUserData()
    const Cartid=CartID()




    useEffect(()=>{

        axiosAPI.get(`products/${param['slug']}`)
        .then(res=> {
            setproduct(res.data)
            setSpecification(res.data.specification)
            setSize(res.data.size)
            setColors(res.data.color)
            setGallery(res.data.gallery)
        })

    },[])


    
    
    const handleColorClick=(citem)=>{
        setColorSelected(citem.name)  
    }

    const handleSizeClick=(sizeitem)=>{
        setSizeSelected(sizeitem.name)
    }

    const handleQuantityChange=(event)=>{
        const qty=event.target.value;
        SetgetQty(qty)   
    }
  
    
    

    async function handleAddtoCartClick(){
  

        try{
             const formData=new FormData();
        formData.append("product_id", product.id);
        formData.append("user_id", UserId);
        formData.append("qty", getQty);
        formData.append("price", product.price);
        formData.append("shipping_amount", product.shipping_amount);
        formData.append("country", currentAddress.country);
        formData.append("size", sizeSelected);
        formData.append("color", colorSelected);
        formData.append("cart_id", Cartid);
            const resposne=await axiosAPI.post("cartview/",formData)

            const cartUrl=UserId ? `cart-list/${Cartid}/${UserId}/` : `cart-list/${Cartid}/`

      axiosAPI.get(cartUrl)
      .then(res =>
        { 
          setCartCount(res.data.length)
        })

        }
        catch(error){
            
            
        }
     
        
    }

    

    const fetchReviewData=()=>{
        axiosAPI.get(`reviews/${product?.id}/`)
        .then(res=>{
            setReviews(res.data); 
         
             
        })
    }


    useEffect(()=>{
        
        fetchReviewData()
    },[product])



    const handleReviewChange=(e)=>{
        setCreateReview({
            ...createReview,
            [e.target.name]:e.target.value
        })
        console.log(createReview);
        
    }



    const handleReviewSubmit=(e)=>{
        e.preventDefault()

        if(UserId){
        const formData=new FormData()

        formData.append("user_id",UserId)
        formData.append("product_id",product?.id)
        formData.append("rating",createReview.rating)
        formData.append("review",createReview.review)

        axiosAPI.post(`reviews/${product?.id}/`,formData)
        .then(res=>{
           fetchReviewData()
        console.log(res.data);
        
        })
    }
    else{
        Swal.fire({
            "icon":"warning",
            "title":"User Must Be Login To Make A Review"
        })
    }



    }
    


    const addtoWishlist=async ()=>{

          if(UserId){
    
            try {

              const formData=new FormData()
    
            formData.append("product_id",product.id)
            formData.append("user_id",UserId)
    
            const response=await  axiosAPI.post(`customer/wishlist/${UserId}/`,formData)
    
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
        <main className="mb-4 mt-4">
    <div className="container">
        {/* Section: Product details */}
        <section className="mb-9">
            <div className="row gx-lg-5">
                <div className="col-md-6 mb-4 mb-md-0">

                    {/* Gallery */}
                    <div className="">
                        <div className="row gx-2 gx-lg-3">
                            <div className="col-12 col-lg-12">
                                <div className="lightbox">
                                    <img
                                        src={product.image}
                                        style={{
                                            width: "100%",
                                            height: 500,
                                            objectFit: "cover",
                                            borderRadius: 10
                                        }}
                                        alt="Gallery image 1"
                                        className="ecommerce-gallery-main-img active w-100 rounded-4"
                                    />
                                </div>
                            </div>
                        </div>



                        <div className="mt-3 d-flex">


                        {gallery?.map((gitem,gindex)=>(
                              <div className="p-3" key={gindex}>
                                <img
                                    src={gitem.image}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        objectFit: "cover",
                                        borderRadius: 10
                                    }}
                                    alt="Gallery image 1"
                                    className="ecommerce-gallery-main-img active w-100 rounded-4"
                                />
                            </div>
                        ))}
                        </div>


                    </div>
                    {/* Gallery */}



                </div>
                <div className="col-md-6 mb-4 mb-md-0">
                    {/* Details */}
                    <div>
                        <h1 className="fw-bold mb-3">{product.title}</h1>
                        <div className="d-flex text-primary just align-items-center">
                            <ul className="mb-3 d-flex p-0" style={{ listStyle: "none" }}>
                                <li>
                                    <i className="fas fa-star fa-sm text-warning ps-0" title="Bad" />
                                    <i className="fas fa-star fa-sm text-warning ps-0" title="Bad" />
                                    <i className="fas fa-star fa-sm text-warning ps-0" title="Bad" />
                                    <i className="fas fa-star fa-sm text-warning ps-0" title="Bad" />
                                    <i className="fas fa-star fa-sm text-warning ps-0" title="Bad" />
                                </li>

                                <li style={{ marginLeft: 10, fontSize: 13 }}>
                                    <a href="" className="text-decoration-none">
                                        <strong className="me-2">4/5</strong>(2 reviews)
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <h5 className="mb-3">
                            <s className="text-muted me-2 small align-middle">${product.price}</s>
                            <span className="align-middle">${product.old_price}</span>
                        </h5>
                        <p className="text-muted">
                           {product.description}
                        </p>


                        {/* Specification */}
                        <div className="table-responsive">
                            <table className="table table-sm table-borderless mb-0">
                                <tbody>
                                    
                                    
                                    
                                    {specification?.map((sitem,sindex)=>(

                                        <tr key={sindex}>
                                        <th className="ps-0 w-25" scope="row">
                                            <strong>{sitem.title}</strong>
                                        </th>
                                        <td>{sitem.content}</td>
                                    </tr>
                                    ))}
                                    


                                </tbody>
                            </table>
                        </div>


                    {/* Quantity */}
                        <hr className="my-5" />
                        <form action="">
                            <div className="row flex-column">
                              
                                <div className="col-md-6 mb-4">
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="typeNumber"><b>Quantity</b></label>
                                        <input
                                            type="number"
                                            id="typeNumber"
                                            className="form-control quantity"
                                            min={1}
                                            value={getQty}
                                            onChange={handleQuantityChange}
                                        />
                                    </div>
                                </div>

                                {/* Size */}
                                {size.length>0 && 
                                <>
                                 <div className="col-md-6 mb-4">
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="typeNumber"><b>Size:</b>{sizeSelected}</label>
                                    </div>
                                    <div className='d-flex'>

                                        {size?.map((sizeitem,sizeindex)=>(
                                             <div key={sizeindex} className='me-2'>
                                            <input type="hidden" className='size_name' value={"XS"} />
                                            <button type="button" className='btn btn-secondary size_button' onClick={()=>{handleSizeClick(sizeitem)}}>{sizeitem.name}</button>
                                        </div>

                                        ))}
                                       
                                        
                                    </div>
                                </div>
                                </>
                                }
                                {/* Size */}

                               

                                {/* Colors */}

                                {colors.length> 0 && 
                                    <>
                                    <div className="col-md-6 mb-4">
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="typeNumber"><b>Color:</b> <span>{colorSelected}</span></label>
                                    </div>
                                    <div className='d-flex'>


                                        {colors?.map((citem,cindex)=>(
                                            <div key={cindex}>
                                            <input type="hidden" className='color_name' value={citem.name} />
                                            <input type="hidden" className='color_image' value={1} />
                                            <button type="button" className='btn p-3 me-2 color_button' onClick={() => handleColorClick(citem)} style={{ background: citem.color_code }}></button>
                                        </div>
                                        ))}
                                
                                        
                                    </div>
                                    <hr />
                                </div>
                                    </>
                                }
                                {/* Colors */}

                                

                            </div>
                            <button onClick={handleAddtoCartClick} type="button" className="btn btn-primary btn-rounded me-2">
                                <i className="fas fa-cart-plus me-2" /> Add to cart
                            </button>
                            <button onClick={()=>{addtoWishlist()}} type="button" className="btn btn-danger btn-floating" data-mdb-toggle="tooltip" title="Add to wishlist">
                                <i className="fas fa-heart" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <hr />
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
           
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" >
                    Review
                </button>
            </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
            <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
                tabIndex={0}
            >
                
            </div>
            <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
                tabIndex={0}
            >
            </div>
            <div
                className="tab-pane fade"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
                tabIndex={0}
            >
                <div className="container mt-5">
                    <div className="row">

                        {/* Column 1: Form to create a new review */}
                        <div className="col-md-6">
                            <h2>Create a New Review</h2>
                            <form onSubmit={handleReviewSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Rating
                                    </label>
                                    <select name="rating" className='form-select' onChange={handleReviewChange} id="">
                                        <option value="1">1 Star</option>
                                        <option value="2">2 Star</option>
                                        <option value="3">3 Star</option>
                                        <option value="4">4 Star</option>
                                        <option value="5">5 Star</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="reviewText" className="form-label">
                                        Review
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="reviewText"
                                        rows={4}
                                        placeholder="Write your review"
                                        name="review"
                                        onChange={handleReviewChange}
                                        value={createReview.review}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Submit Review
                                </button>
                            </form>
                        </div>
                        {/* Column 2: Display existing reviews */}
                        <div className="col-md-6">
                            <h2>Existing Reviews</h2>
                            <div className="mb-3">
                                
                            <div className="">
                                
                                {reviews?.map((ritem,rindex)=>(
                                    <div className="row g-0 mb-3 p-2 border" key={rindex}>

                                    <div className="col-md-3 ">
                                        <img
                                            src={ritem.profile?.image}
                                            alt="User Image"
                                            className="img-fluid p-2"
                                        />
                                    </div>
                                    <div className="col-md-9">
                                        <div className="card-body">
                                            <h5 className="card-title">{ritem.profile?.full_name}</h5>
                                            <p className="card-text">{moment(reviews.data).format("MMM D, YYYY") }</p>

                                            <p className="card-text">{ritem.review}</p>

{/* Stars should be outside the <p> */}
<div>
  {[...Array(ritem.rating)].map((_, i) => (
    <i key={i} className="fas fa-star"></i>
  ))}
</div>
                                                
                                                
                                    
                                        </div>
                                    </div>

                                </div>

                                ))}

                                


                            </div>
                            </div>
                            {/* More reviews can be added here */}
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="tab-pane fade"
                id="pills-disabled"
                role="tabpanel"
                aria-labelledby="pills-disabled-tab"
                tabIndex={0}
            >
            </div>
        </div>
    </div>
</main>
    )
}

export default ProductDetails;