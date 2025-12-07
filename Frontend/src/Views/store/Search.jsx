import { useEffect, useState } from "react";
import axiosAPI from "../../Axios/axiossetup";
import { Link ,useSearchParams} from "react-router-dom";
import CartID from '../Plugin/CartID';
import useUserData from "../Plugin/UserData";
import GetCurrentAddress from '../Plugin/UserCountry';
import Swal from "sweetalert2";


const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});





function Search(){


    
  const currentAddress=GetCurrentAddress();
  const userId=useUserData()
  const cartId=CartID()

  
    
    const [products,setproducts]=useState([])
    const [categories,setcategories]=useState([])

    
    const [colorValue,SetColorValue]=useState({})
    const [sizeValue,SetSizeValue]=useState({})

    const [sizeSelected,setSizeSelected]=useState({})
    const [colorSelected,setColorSelected]=useState({})
    const [qtySelected,setQtySelectted]=useState({})


    const [searchParams]=useSearchParams()
    const query=searchParams.get("query")



  

    useEffect(()=>{
         axiosAPI.get(`search/?query=${query}`)
        .then(res => {
            setproducts(res.data)
        })
      
     
    },[query])

    useEffect(()=>{
        axiosAPI.get("category/")
        .then(res => {
            setcategories(res.data)
        } )
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

        Toast.fire({
          icon:"success",
          title:"Added To Cart"
        })

        }
        catch(error){
            console.log(error);
            
        }
      
    }

   
    

















    return(
        
        <>
        <main className="mt-5">
    <div className="container">
      <section className="text-center">
        <div className="row">


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
    onClick={() => addToWishlist(item)}
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
         
         







        <div className='row'>
        {categories?.map((catitem,catindex)=>{

            return (
            <div className="col-lg-2 mt-3" key={catindex}>
            <img src={catitem.image} style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} alt="" />
            <h6 className="mt-2">{catitem.title}</h6>
            </div>

            )
        })}   
        </div>




        </div>
      </section>
      {/*Section: Wishlist*/}
    </div>
  </main>
        </>
    )

}


export default Search;