import React, { useState,createContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useAuth } from "../ContextStore/UserAuth.jsx";
import { FullReset, ProfileLogoutRequest } from "../ReduxSlices/ProfileSlice";
import "../Css/Header.css"
import { useContext } from "react";
import axiosAPI from "../Axios/axiossetup.js";
import { CartContext,CartProvider } from "../Views/Plugin/Context.jsx";

function Header() {
  const dispatch = useDispatch();

  const { cartCount } = useContext(CartContext);


  

  const { loggedIn, setLoggedIn } = useAuth();
  const [search,setSearch]=useState("")

  const navigate=useNavigate()

  const handleLogout = () => {
    dispatch(ProfileLogoutRequest())
      .unwrap()
      .then(() => {
        setLoggedIn(false);
        dispatch(FullReset());
      });
  };

  const handleSearchChange=(event)=>{
    setSearch(event.target.value);

    
    
  }

  const handleSearchubmit=()=>{

      navigate(`/search?query=${search}`)
  }




  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark py-3 shadow-sm">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          Ecommerce
        </Link>

        {/* Hamburger */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Section */}
        
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">



            {/* User Dropdown */}
            

            {/* Vendor Dropdown */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="vendorDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </Link>
              <ul className="dropdown-menu bg-dark" aria-labelledby="vendorDropdown">
                <li><Link className="dropdown-item text-white" to="/customer/account/">Account</Link></li>
    <li><Link className="dropdown-item text-white" to="/customer/orders/">Orders</Link></li>
    <li><Link className="dropdown-item text-white" to="/customer/wishlist/">Wishlist</Link></li>
    <li><Link className="dropdown-item text-white" to="/customer/notifications/">Notifications</Link></li>
    <li><Link className="dropdown-item text-white" to="/customer/settings/">Settings</Link></li>
              </ul>
            </li>

             <li className="nav-item dropdown">
  <button
    className="nav-link dropdown-toggle bg-transparent border-0 "
    id="userDropdown"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Vendor
  </button>
  <ul className="dropdown-menu bg-dark" aria-labelledby="userDropdown">
    <li><Link className="dropdown-item text-white" to="/vendor/dashboard/">Dashboard</Link></li>
    <li><Link className="dropdown-item text-white" to="/vendor/products/">Products</Link></li>
    <li><Link className="dropdown-item text-white" to="/vendor/orders/">Orders</Link></li>
    <li><Link className="dropdown-item text-white" to="/vendor/earning/">Earnings</Link></li>
    <li><Link className="dropdown-item text-white" to="/vendor/reviews/">Reviews</Link></li>
    <li><Link className="dropdown-item text-white" to="/vendor/add-products">Add Product</Link></li>
    <li><Link className="dropdown-item text-white" to="/vendor/coupon/">Coupons</Link></li>
    <li><Link className="dropdown-item text-white" to="/vendor/notifications/">Notifications</Link></li>
    <li><Link className="dropdown-item text-white" to="/vendor/settings/">Settings</Link></li>
    
  </ul>
</li>
      


          </ul>

          {/* Right Section (stacked on mobile, aligned right on desktop) */}
<div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-3 mt-3 mt-md-0 ms-md-auto ">

  {/* Search */}
  <div className="input-group w-100 w-md-auto">
    <input
      type="text"
      className="form-control"
      placeholder="Search..."
      aria-label="Search"
      onChange={handleSearchChange}
    />
    <button className="btn btn-primary" type="button" onClick={handleSearchubmit}>
      <FaSearch />
    </button>
  </div>

  {/* Auth Buttons */}
  {loggedIn ? (
    <>
      <Link to={"/customer/account/"} className="btn btn-outline-light w-100 w-md-auto">Account</Link>
      <button
        onClick={handleLogout}
        className="btn btn-danger w-100 w-md-auto"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link to="/login" className="btn btn-outline-light w-100 w-md-auto">Login</Link>
      <Link to="/register" className="btn btn-primary w-100 w-md-auto">Register</Link>
    </>
  )}

  {/* Cart */}
    <Link to="/cart" className="btn btn-outline-light position-relative p-2 w-auto">
    <FaCartShopping size={25} /> {/* smaller icon */}
    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
      {cartCount}
    </span>
  </Link>
</div>

        </div>
      </div>
    </nav>
  );
}

export default Header;
