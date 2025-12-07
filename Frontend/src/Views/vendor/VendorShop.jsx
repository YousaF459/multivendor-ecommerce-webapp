import VendorSidebar from "./VendorSidebar";
import { Link,useParams } from "react-router-dom";
import axiosAPI from "../../Axios/axiossetup";
import VendorData from '../Plugin/VendorData'
import { useEffect, useState } from "react";
import useUserData from "../Plugin/UserData";
import moment from "moment";
import { useContext } from "react";
import { CartContext } from "../Plugin/Context";
import CartID from '../Plugin/CartID';
import GetCurrentAddress from '../Plugin/UserCountry';
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

function VendorShop(){


    const [vendor,setVendor]=useState([])
    const [products,setProducts]=useState([])
    const param=useParams()

    const currentAddress=GetCurrentAddress();
  const userId=useUserData()
  const cartId=CartID()

     const { count, setCount, cartCount, setCartCount } = useContext(CartContext);
    const [colorValue,SetColorValue]=useState({})
    const [sizeValue,SetSizeValue]=useState({})

    const [sizeSelected,setSizeSelected]=useState({})
    const [colorSelected,setColorSelected]=useState({})
    const [qtySelected,setQtySelectted]=useState({})


    useEffect(()=>{
        axiosAPI.get(`shop/${param.slug}/`)
        .then(res=>{
            setVendor(res.data);
        })
    },[])

      useEffect(()=>{
        axiosAPI.get(`vendor-products/${param.slug}/`)
        .then(res=>{
            setProducts(res.data);
        })
    },[])


    
    function SizeClickhanlder(product,sizeitem){
      const product_id=product.id


      setSizeSelected((oldVlaue)=>({
        ...oldVlaue,
        [product_id]:sizeitem.name
      }))
     
    }
     

    function ColorClickhandler(product,coloritem){
     
      const product_id=product.id

      SetColorValue((oldVlaue)=>({
        ...oldVlaue,
        [product_id]:coloritem.name
      }))
    
      setColorSelected((oldVlaue)=>({
        ...oldVlaue,
        [product_id]:coloritem.color_code
      }))
       
    }


    function QuantityHanlder(e,product){
      
      
       setQtySelectted((oldvalue)=>({
        ...oldvalue,
        [product.id]:e.target.value
      }))

    }


        
    async function handleAddtoCartClick(item){


      if (item.size.length > 0 && !sizeSelected[item["id"]]) {
    alert("Please select a size before adding to cart.");
    return;
  }

  // Validate color
  if (item.color.length > 0 && !colorSelected[item["id"]]) {
    alert("Please select a color before adding to cart.");
    return;
  }

  const qty = qtySelected[item["id"]] ? qtySelected[item["id"]] : 1;

       try{
      

        
             const formData=new FormData();
        formData.append("product_id", item.id);
        formData.append("user_id", userId);
        formData.append("price", item.price);
        formData.append("shipping_amount", item.shipping_amount);
        formData.append("country", currentAddress.country);
        formData.append("size",sizeSelected[item["id"]]);
        formData.append("color", colorSelected[item["id"]]);
        formData.append("cart_id", cartId);
        formData.append("qty", qty);
          
        const response=await axiosAPI.post("cartview/",formData)


        const cartUrl=userId ? `cart-list/${cartId}/${userId}/` : `cart-list/${cartId}/`
        axiosAPI.get(cartUrl)
      .then(res =>
        { 
          setCartCount(res.data.length)
        })

        Toast.fire({
          icon:"success",
          title:"Added To Cart"
        })

        }
        catch(error){
            console.log(error);
            
        }
      
    }


    const addtoWishlist=async (product)=>{
      if(userId){

        try {

          const formData=new FormData()

        formData.append("product_id",product.id)
        formData.append("user_id",userId)

        const response=await  axiosAPI.post(`customer/wishlist/${userId}/`,formData)

        Swal.fire({
          "icon":"success",
          "title":response.data.message
        })
        
          
        } catch (error) {
          
        }
        
    

      }
      
      
    }
   




    return(
       <main className="mt-5">
    <div className="container">
        <section className="text-center container">
            <div className="row py-lg-5">
                <div className="col-lg-6 col-md-8 mx-auto">
                    <img src={vendor?.image || null} style={{ width: 100, height: 100, objectFit: "cover", borderRadius: "50%" }} alt="" />
                    <h1 className="fw-light">{vendor?.name || ""}</h1>
                    <p className="lead text-muted">{vendor?.description || ""}</p>
                </div>
            </div>
        </section>
        <section className="text-center">
            <h4 className="mb-4">{products.length} Products </h4>
            <div className="row">
                {/* Run the .map() function here */}
                {products.map((item,index)=>{

            return(
           
            <div className="col-lg-4 col-md-12 mb-4" key={index}>
            <div className="card">
              <div
                className="bg-image hover-zoom ripple"
                data-mdb-ripple-color="light"
              >
                <Link to={`/detail/${item.slug}`}>
                <img
                  src={item.image}
                  className="w-100"
                  style={{width:"100%",height:250,objectFit:"cover"}}
                />
                </Link>
                
              </div>
              <div className="card-body">

                <Link to={`/detail/${item.slug}`} className="text-reset">
                  <h5 className="card-title mb-3">{item.title}</h5>
                </Link>

                <a href="" className="text-reset">
                  <p>{item?.category.title}</p>
                </a>

                <div className="d-flex justify-content-center">
                <h6 className="mb-3">${item.price}</h6>
                <h6 className="mb-3 text-muted ps-2"><strike>${item.old_price}</strike></h6>
                </div>

                <div className="btn-group">
                  <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuClickable"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="false"
                    aria-expanded="false"
                  >
                    Variation
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuClickable"
                  >



                <div className="ps-1 pe-1 d-flex flex-column mb-2">
                <label htmlFor="qty"><b>Quantity</b></label>
                <input type="number" value={qtySelected[item["id"]]} onChange={(e)=>{QuantityHanlder(e,item)}} id="qty"  min="1"></input>
                </div>


                  {item.size.length>0 && (
                    <div className="d-flex flex-column">
                      <li className="p-1">
                        <b>Size : </b>{sizeSelected[item.id] || "No Size"}
                      </li>
                      <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                        {item.size?.map((sizeitem,sizeindex)=>(
                          <li key={sizeindex}>
                          <button onClick={()=>{SizeClickhanlder(item,sizeitem)}} className="btn btn-secondary btn-sm me-2 mb-1">
                            {sizeitem?.name}
                          </button>
                        </li>

                        ))}          
                      </div>
                    </div>
                  )}
                    


                  {item.color.length >0 &&   (

                     <div className="d-flex flex-column mt-3">
                      <li className="p-1">
                        <b>COlor : </b>{colorValue[item["id"]] || "No Color"}              
                      </li>
                      <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                        
                       {item.color?.map((coloritem,colorindex)=>(
                        <li key={colorindex}>
                          <button
                            onClick={()=>{
                              ColorClickhandler(item,coloritem)
                            }}
                            className="btn btn-sm me-2 mb-1 p-3"
                            style={{ backgroundColor: `${coloritem.color_code}` }}
                          />
                        </li>
                      ))}
                      </div>
                    </div>  

                  )}
                    
                  
                   




                  <div className="d-flex mt-3 p-1">
  {/* Add to Cart */}
  <button
    type="button"
    className="btn btn-primary me-1 mb-1"
    onClick={() => handleAddtoCartClick(item)}
  >
    <i className="fas fa-shopping-cart" />
  </button>

  {/* Add to Wishlist */}
  <button
    type="button"
    className="btn btn-danger px-3 me-1 mb-1 ms-2"
    onClick={() => addtoWishlist(item)}
  >
    <i className="fas fa-heart" />
  </button>
</div>


                  </ul>
                  
                </div>
              </div>
            </div>

            </div>

        )})}
         
                {/* .map() function end here */}
            </div>
        </section>
    </div>
</main>
    )
}

export default VendorShop