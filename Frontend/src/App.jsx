import RegisterUser from "./components/RegisterUser"
import UserLogin from "./components/UserLogin"
import PasswordResetEmail from "./components/PasswordResetEmail"
import PasswordResetConfirm from "./components/PasswordResetConfirm"
import UserProfileView from "./components/UserProfileView"
import VerifyEmail from "./components/VerifyEmail"
import HomeComponent from "./components/HomeComponent"
import { BrowserRouter } from "react-router-dom"
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer"
import {AuthProvider} from '../src/ContextStore/UserAuth';
import Products from '../src/Views/store/Products';
import ProductDetails from "./Views/store/ProductDetails"
import Cart from "./Views/store/Cart"
import Checkout from "./Views/store/Checkout"
import Search from "./Views/store/Search"
import PaymentSuccess from "./Views/store/PaymentSuccess"
import Account from "./Views/customers/Account"
import Orders from "./Views/customers/Orders"
import OrderDetail from "./Views/customers/OrderDetail"
import Wishlist from "./Views/customers/Wishlist"
import CustomerNotification from "./Views/customers/CustomerNotification"
import CustomerSettings from "./Views/customers/Settings"
import Invoice from "./Views/customers/Invoice"
import VendorDashboard from "./Views/vendor/Dashboard"
import VendorProducts from "./Views/vendor/Products"
import VendorOrders from "./Views/vendor/Orders"
import VendorOrderDetail from "./Views/vendor/VendorOrderDetail"
import VendorEarning from "./Views/vendor/VendorEarning"
import VendorReviews from "./Views/vendor/VendorReviews"
import ReviewDetail from "./Views/vendor/ReviewDetails"
import VendorCoupon from "./Views/vendor/VendorCoupons"
import EditCoupon from "./Views/vendor/EditCoupon"
import VendorNotification from "./Views/vendor/VendorNotification"
import VendorSettings from "./Views/vendor/VendorSettings"
import VendorShop from "./Views/vendor/VendorShop"
import VendorAddProduct from "./Views/vendor/VendorAddProduct"
import UpdateProduct from "./Views/vendor/UpdateProduct"


function App() {


  return (
    <>

    
    <Header/>

    <Routes>


  
      {/*<Route path="/Home" element={<HomeComponent />} />*/}
      <Route path="/register" element={<RegisterUser />} />
      
      <Route path="/login" element={<UserLogin />} />
     
      {/*<Route path="/reset-password" element={<PasswordResetEmail />} />*/}
      
      {/*<Route
          path="/reset-password/confirm/:uidb64/:token"
          element={<PasswordResetConfirm />}
        />*/}

      <Route path="/profile" element={<UserProfileView />} />
      {/*<Route path="/verify" element={<VerifyEmail />} />*/}

      <Route path="/" element={<Products/>}/>
      <Route path="/detail/:slug/" element={<ProductDetails/>}/>

      <Route path="/cart" element={<Cart/>}/>

      <Route path="/checkout/:order_oid/" element={<Checkout/>}/>

      <Route path="/payment-success/:order_oid" element={<PaymentSuccess/>}/>

      <Route path="/search" element={<Search/>}/>


      {/* Customer Routes */}

      <Route path="/customer/account/" element={<Account/>}/>
      <Route path="/customer/orders/" element={<Orders/>}/>
      <Route path="/customer/orders/:order_oid/" element={<OrderDetail/>}/>
      <Route path="/customer/wishlist/"  element={<Wishlist/>}/>
      <Route path="/customer/notifications/"  element={<CustomerNotification/>}/>
      <Route path="/customer/settings/"  element={<CustomerSettings/>}/>
      <Route path="/customer/invoice/:order_oid/"  element={<Invoice/>}/>


       {/* Vendor Routes */}
      <Route path="/vendor/dashboard/"  element={<VendorDashboard/>}/>

      <Route path="/vendor/products/"  element={<VendorProducts/>}/>

    <Route path="/vendor/orders/"  element={<VendorOrders/>}/>

    <Route path="/vendor/orders/:order_oid/"  element={<VendorOrderDetail/>}/>
    <Route path="/vendor/earning/"  element={<VendorEarning/>}/>
    <Route path="/vendor/reviews/"  element={<VendorReviews/>}/>
    <Route path="/vendor/reviews/:review_id/"  element={<ReviewDetail/>}/>
    <Route path="/vendor/coupon/"  element={<VendorCoupon/>}/>
    <Route path="/vendor/coupon/:coupon_id"  element={<EditCoupon/>}/>
    <Route path="/vendor/notifications/"  element={<VendorNotification/>}/>

    <Route path="/vendor/settings/"  element={<VendorSettings/>}/>

    <Route path="/vendor/:slug/"  element={<VendorShop/>}/>

    <Route path="/vendor/add-products/"  element={<VendorAddProduct/>}/>
    <Route path="/vendor/product/update/:pid/"  element={<UpdateProduct/>}/>

    </Routes>

    <Footer/>
    
    </>
  )
}

export default App
