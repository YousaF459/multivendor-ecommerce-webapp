import { NavLink } from 'react-router-dom';
import '../Css/UserLogin.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom"; 
import {LoginRequest} from '../ReduxSlices/LoginSlice';
import {basicReset} from '../ReduxSlices/LoginSlice';
import { Link } from 'react-router-dom';
import {useAuth} from '../ContextStore/UserAuth'

function UserLogin() {

const { loggedIn, setLoggedIn } = useAuth();

  const navigate=useNavigate()
  const dispatch=useDispatch();
  const {error,loading,success}=useSelector((state)=> state.LoginReducer)

  const [loginForm,setloginForm]=useState({
    "email":"",
    "password":""
  })
  

  function handleChange(e){
        setloginForm({...loginForm,[e.target.name]:e.target.value})
    }

   function handleSubmit(e){
        e.preventDefault(); 
        
        dispatch(LoginRequest(loginForm))
        .unwrap()
        .then(()=>{
            navigate('/profile');
            setLoggedIn(true)
            dispatch(basicReset())  
        })
        .catch((error)=>{
          
          
        })
          
    }


  useEffect(() => {
  // (optional) any logic you want to run when component mounts

  return () => {
    // cleanup when component unmounts
    dispatch(basicReset());
  };
}, [dispatch]);



  return (
    <>
      <div className="container-fluid containerFuildDesign py-5">
        <div className="container mt-5">
          <div className='row'>
            <div className="formHolder col-12 col-sm-8 col-lg-6  text-center mx-auto py-4 px-5 shadow-lg">
          
          <h2 className='text-center mb-4 fw-bold text-primary'>Login</h2>
          <h3 className='text-center instruct text-muted mb-4'>Please make sure you’re registered and have verified your email before logging in</h3>

          <form className="text-start login-form" onSubmit={handleSubmit}>



            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                value={loginForm.email}
                onChange={handleChange}
                name="email"
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Your Password"
                value={loginForm.password}
                onChange={handleChange}
                name="password"
                className="form-control"
                required
              />
            </div>

            <div className="text-end mb-3">
              <NavLink to="/reset-password" className="text-decoration-none small text-primary">
                Forgot Password?
              </NavLink>
            </div>

           {loading && <p className="text-center text-muted">Loading...</p>}
            {success && <p className="text-success text-center">{success}</p>}
            {error && <p className="text-danger text-center">{error?.message || error?.error}</p>}


            <div className="d-grid gap-2">

              {loading ? (<button disabled className="btn btn-primary py-2 fw-semibold">
              <i className="fas fa-spinner fa-spin me-2"></i>
            Logging in...
            </button>) :(
                <button type="submit" className="btn btn-primary py-2 fw-semibold">
                Login
              </button>

              )}
              


              <Link to="/verify">
                <button type="button" className="btn btn-outline-primary py-2 fw-semibold">
                  Verify Email
                </button>
              </Link>
            </div>


            <div className="text-center mt-4">
              <span className="text-muted">
                Don't have an account?{" "}
                <NavLink to="/register" className="text-decoration-none fw-semibold text-primary">
                  Sign Up
                </NavLink>
              </span>
            </div>




          </form>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserLogin;
