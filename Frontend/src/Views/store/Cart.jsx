import { useEffect, useState,useRef } from "react";
import { Link } from "react-router-dom";
import axiosAPI from "../../Axios/axiossetup";
import useUserData from "../Plugin/UserData"
import CartID from "../Plugin/CartID"
import GetCurrentAddress from '../Plugin/UserCountry';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../Plugin/Context";


const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});


function Cart(){


  
    const { count, setCount, cartCount, setCartCount } = useContext(CartContext);

    const[cart,setCart]=useState([])
    const [cartTotal,setCartTotal]=useState({})
    const[productQty,setProductQty]=useState({})

    const user_id=useUserData();
    const cart_id=CartID();
    const currentAddress=GetCurrentAddress();

    const nameRef = useRef();
    const emailRef=useRef();
    const mobileRef=useRef();
    const addressRef=useRef();
    const cityRef=useRef()
    const stateRef=useRef();
    const countryRef=useRef()

    const navigate=useNavigate()
    

    

    const FetchCartData=(userID,cartID)=>{
      const url=userID ? `cart-list/${cartID}/${userID}/` : `cart-list/${cartID}/`

      axiosAPI.get(url)
      .then(res =>
        { 
          setCart(res.data)
       
          
        })
    }


    const FetchCartTotal=(userID,cartID)=>{
      const url=userID ? `cart-detail/${cartID}/${userID}/` : `cart-detail/${cartID}/`

      axiosAPI.get(url)
      .then(res =>
        { 
          setCartTotal(res.data)
        })
    }

   
    useEffect(()=>{
      if( cart_id !== null && cart_id !== "undefined" && cart_id !== ""){

        if(user_id !== undefined && user_id !== null && user_id !== ""){
          FetchCartData(user_id,cart_id)
          FetchCartTotal(user_id,cart_id)
        }
        else{
          FetchCartData(null,cart_id)
          FetchCartTotal(null,cart_id)
        }  

      }
    },[])

    useEffect(()=>{
      const initialQty={}
      cart.forEach((item)=>{
        initialQty[item.product.id]=item.qty
      })
      setProductQty(initialQty)
      
    },[cart])
    
    
    const handleQtyChange=(e,product_id)=>{
    
      setProductQty(oldvalue => ({
        ...oldvalue,
        [product_id]:e.target.value
    }) 
    )

    
    }
   

   async function CartUpdate(c){


      try{
        const qty=productQty[c.product.id]
      
  
        
             const formData=new FormData();
        formData.append("product_id", c.id);
        formData.append("user_id", user_id);
        formData.append("price", c.price);
        formData.append("shipping_amount", c.shipping_amount);
        formData.append("country", currentAddress.country);
        formData.append("size",c.size);
        formData.append("color", c.color);
        formData.append("cart_id", cart_id);
        formData.append("qty", qty);
          
        const response=await axiosAPI.post("cartview/",formData)

        Toast.fire({
          icon:"success",
          title:"Added To Cart"
        })

         if(user_id){
      FetchCartData(user_id, cart_id);
      FetchCartTotal(user_id, cart_id);
    } else {
      FetchCartData(null, cart_id);
      FetchCartTotal(null, cart_id);
    }

        }
        catch(error){
            console.log(error);
            
        }
      
      
      
    }


    useEffect(()=>{
  
      
    },[cart])





    const handleItemDeletion=async (item_id)=>{

      try{

        console.log("clcikededed");
         const url=user_id ? `cart-delete/${cart_id}/${item_id}/${user_id}/` : `cart-delete/${cart_id}/${item_id}/`

     await axiosAPI.delete(url)


     const cartUrl=user_id ? `cart-list/${cart_id}/${user_id}/` : `cart-list/${cart_id}/`

      axiosAPI.get(cartUrl)
      .then(res =>
        { 
          setCartCount(res.data.length)
        })


    Toast.fire({
          icon:"success",
          title:"Item Deleted"
        })

         if(user_id){
      FetchCartData(user_id, cart_id);
      FetchCartTotal(user_id, cart_id);
    } else {
      FetchCartData(null, cart_id);
      FetchCartTotal(null, cart_id);
    }


      }
      catch(error){
        //error dsiplay
      }

     

     
    }



    async function handelPersonalDetails(){

      const fullName=nameRef.current.value
      const email=emailRef.current.value
      const mobile=mobileRef.current.value
      const address=addressRef.current.value
      const city=cityRef.current.value
      const state=stateRef.current.value
      const country=countryRef.current.value
      


      
      if (!fullName || !email || !mobile || !address || !city|| !state || !country){
        Swal.fire({
          "icon":"warning",
          "title":"Missing Fields!",
          "text":"All Fields are Required before Checkout"

        }) 
      }
      else{

        try {
          const form=new FormData()

      form.append("full_name",fullName)
      form.append("email",email)
      form.append("mobile",mobile)
      form.append("address",address)
      form.append("city",city)
      form.append("state",state)
      form.append("country",country)
      form.append("cart_id",cart_id)
      form.append("user_id",user_id ? user_id : 0)

      const response=await axiosAPI.post("create-order/",form)


      navigate(`/checkout/${response.data.order_id}/`)
      console.log(response.data.message)

        } catch (error) {
          console.log(error);
          
        }

      }
      

      
      
    }






    return(
        <>
        <div>
  <main className="mt-5">

    <div className="container">

      <main className="mb-6">

        <div className="container">

          <section className="">

            <div className="row gx-lg-5 mb-5">

              <div className="col-lg-8 mb-4 mb-md-0">
                <section className="mb-5">


                {/* CART ITEMS SECTION */}

                {cart?.map((c,cindex)=>(
                   <div className="row border-bottom mb-4" key={cindex}>
                    <div className="col-md-2 mb-4 mb-md-0">
                      <div
                        className="bg-image ripple rounded-5 mb-4 overflow-hidden d-block"
                        data-ripple-color="light"
                      >
                        <Link to=''>
                          <img
                            src={c.product?.image}
                            className="w-100"
                            alt=""
                            style={{ height: "100px",width:"100px", objectFit: "cover", borderRadius: "10px" }}
                          />
                        </Link>
                        <a href="#!">
                          <div className="hover-overlay">
                            <div
                              className="mask"
                              style={{
                                backgroundColor: "hsla(0, 0%, 98.4%, 0.2)"
                              }}
                            />
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-8 mb-4 mb-md-0">
                      <Link to={null} className="fw-bold text-dark mb-4">{c.product?.title}</Link>
                      <p className="mb-0">
                        <span className="text-muted me-2">Size:</span>
                        <span>{c.size}</span>
                      </p>
                      <p className='mb-0'>
                        <span className="text-muted me-2">Color:</span>
                        <span>{c.color}</span>
                      </p>
                      <p className='mb-0'>
                        <span className="text-muted me-2">Price:</span>
                        <span>${c.price}</span>
                      </p>
                      <p className='mb-0'>
                        <span className="text-muted me-2">Stock Qty:</span>
                        <span>{c.qty}</span>
                      </p>
                      <p className='mb-0'>
                        <span className="text-muted me-2">Vendor:</span>
                        <span>Desphixs</span>
                      </p>
                      <p className="mt-3">
                        <button onClick={()=>{
                          handleItemDeletion(c.id)
                        }}className="btn btn-danger ">
                          <small><i className="fas fa-trash me-2" />Remove</small>
                        </button>
                      </p>
                    </div>
                    <div className="col-md-2 mb-4 mb-md-0">
                      <div className="d-flex justify-content-center align-items-center">
                        
                        <div className="form-outline">
                         <input 
                         className="ps-2"
                        style={{width:"50px",height:"35px"}}
                         value={productQty[c.product.id] ?? c.qty} 
                         type="number"
                         min={1}
                         onChange={(e)=>{
                          handleQtyChange(e,c.product.id)
                         }}
                         />
                        </div>

                        <button onClick={()=>{CartUpdate(c)}} className='ms-2 btn btn-primary'><i className='fas fa-rotate-right'></i></button>
                      </div>
                      <h5 className="mb-2 mt-3 text-center"><span className="align-middle">${c.sub_total}</span></h5>
                    </div>
                  </div>

                ))}
                  {/* CART ITEMS SECTION */}


                {cart.length < 1 && 
                 <>
                    <h5>Your Cart Is Empty</h5>
                    <Link to='/'> <i className='fas fa-shopping-cart'></i> Continue Shopping</Link>
                  </>
                }
                 

                </section>

                {cart.length > 0 && (
                  <div>
                  <h5 className="mb-4 mt-4">Personal Information</h5>
                  {/* 2 column grid layout with text inputs for the first and last names */}
                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="full_name"> <i className='fas fa-user'></i> Full Name</label>
                        <input
                          type="text"
                          id=""
                          name='fullName'
                          ref={nameRef}
                          className="form-control"
                        />
                      </div>
                    </div>

                  </div>

                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example1"><i className='fas fa-envelope'></i> Email</label>
                        <input
                          type="text"
                          id="form6Example1"
                          className="form-control"
                          name='email'
                          ref={emailRef}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example1"><i className='fas fa-phone'></i> Mobile</label>
                        <input
                          type="text"
                          id="form6Example1"
                          className="form-control"
                          name='mobile'
                          ref={mobileRef}
                        />
                      </div>
                    </div>
                  </div>

                  <h5 className="mb-1 mt-4">Shipping address</h5>

                  <div className="row mb-4">
                    <div className="col-lg-6 mt-3">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example1"> Address</label>
                        <input
                          type="text"
                          id="form6Example1"
                          className="form-control"
                          name='address'
                          ref={addressRef}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 mt-3">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example1"> City</label>
                        <input
                          type="text"
                          id="form6Example1"
                          className="form-control"
                          name='city'
                          ref={cityRef}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 mt-3">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example1"> State</label>
                        <input
                          type="text"
                          id="form6Example1"
                          className="form-control"
                          name='state'
                          ref={stateRef}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 mt-3">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example1"> Country</label>
                        <input
                          type="text"
                          id="form6Example1"
                          className="form-control"
                          name='country'
                          ref={countryRef}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                )}
                

              </div>





              <div className="col-lg-4 mb-4 mb-md-0">

                {/* Section: Summary */}
                <section className="shadow-4 p-4 rounded-5 mb-4">
                  <h5 className="mb-3">Cart Summary</h5>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Subtotal </span>
                    <span>${cartTotal.sub_total}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Shipping </span>
                    <span>${cartTotal.shipping}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Tax </span>
                    <span>${cartTotal.tax}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Servive Fee </span>
                    <span>${cartTotal.service_fee}</span>
                  </div>
                  <hr className="my-4" />
                  <div className="d-flex justify-content-between fw-bold mb-5">
                    <span>Total </span>
                    <span>${Number(cartTotal.total || 0).toFixed(2)}</span>
                  </div>
                  <button onClick={()=>{
                    handelPersonalDetails()
                  }} className="btn btn-primary btn-rounded w-100" >
                    Got to checkout
                  </button>
                </section>
                 </div>



            </div>
          </section>


        </div>
      </main>
    </div>
  </main>
</div>
        </>
    )
}

export default Cart;