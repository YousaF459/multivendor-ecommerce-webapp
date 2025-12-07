import VendorSidebar from "./VendorSidebar";
import { Link } from "react-router-dom";
import axiosAPI from "../../Axios/axiossetup";
import VendorData from '../Plugin/VendorData'
import { useEffect, useState } from "react";

function VendorProducts(){

    const [products,setProducts]=useState([])
    const vendorid=VendorData()

    
    useEffect(()=>{
        if(vendorid){

            axiosAPI.get(`vendor/products/${vendorid}/`)
            .then((res)=>{
                setProducts(res.data)
  
            })

        }
    },[vendorid])


    const handleDeleteProduct=async (productPid)=>{
   
      await axiosAPI.delete(`vendor-delete-product/${vendorid}/${productPid}/`)

      axiosAPI.get(`vendor/products/${vendorid}/`)
            .then((res)=>{
                setProducts(res.data)
  
            })
      
    }


    return(
        <div className="container-fluid" id="main">
  <div className="row row-offcanvas row-offcanvas-left h-100">
    {/* Side Bar Here */}
    <VendorSidebar/>
    <div className="col-md-9 col-lg-10 main mt-4">
      {!vendorid && (
  <div className="alert alert-warning text-center fw-semibold mt-3">
    You must be logged in to view this section.
  </div>
)}
      <div className="row mb-3 container">
        <h4>
          <i className="bi bi-grid" /> All Products
        </h4>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle btn-sm mt-3 mb-4"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Filter <i className="fas fa-sliders" />
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a className="dropdown-item" href="#">
                Status: Live
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Status: In-active
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Status: In-review
              </a>
            </li>
            <hr />
            <li>
              <a className="dropdown-item" href="#">
                Date: Latest
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Date: Oldest
              </a>
            </li>
          </ul>
        </div>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Orders</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>


            {products?.map((pitem,pindex)=>(

                 <tr key={pindex}>
     <th scope="row" ><img style={{height:"70px",width:'70px',objectFit:"cover",borderRadius:"10px"}} src={pitem?.image} alt="" /></th>

              <td>{pitem?.title}</td>
              <td>${pitem?.price}</td>
              <td>{pitem?.stock_qty}</td>
              <td>{pitem?.orders}</td>
              <td>{pitem?.status}</td>
              <td>
                <Link to={`/detail/${pitem.slug}/`} className="btn btn-primary mb-1 me-2">
                  <i className="fas fa-eye" />
                </Link>
                <Link to={`/vendor/product/update/${pitem.pid}/`} className="btn btn-success mb-1 me-2">
                  <i className="fas fa-edit" />
                </Link>
                <button onClick={()=>{handleDeleteProduct(pitem.pid)}} className="btn btn-danger mb-1 me-2">
                  <i className="fas fa-trash" />
                </button>
              </td>
            </tr>

            ))}
           
           
           
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    )
}


export default VendorProducts;