import React, { useState,useEffect } from 'react';
import '../Css/RegisterUser.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector} from 'react-redux';
import { registerUser } from '../ReduxSlices/RegisterSlice';
import {resetRegisterState,resetAfterVerify,resetVerifyState} from  '../ReduxSlices/RegisterSlice'

function RegisterUser() {
    const navigate=useNavigate()

    const dispatch=useDispatch();
    const {loading,success,error,registeredEmail,isRegistered}=useSelector((state)=> state.register)

    
    

    const [registerForm,setregisterForm]=useState({
        "email":"",
        "full_name":"",
        "phone":"",
        "username":"",
        "password":"",
        "password2":""
    })

    function handleSubmit(e){
        e.preventDefault(); 
       
        dispatch(registerUser(registerForm))
  .unwrap()
  .then(() => {
    // navigate to email verification page only after successful registration
    navigate("/login");
  })
  .catch((err) => {
    
  });  
  
    }

    function handleChange(e){
        setregisterForm({...registerForm,[e.target.name]:e.target.value})
    }


    useEffect(()=>{

        return ()=>{dispatch(resetRegisterState())}
    },[dispatch])



    
     
   


    return (
        <>
      <div className="container-fluid containerFuildDesign py-5">
        <div className="container mt-5">
          <div className="row">
            <div className="formHolder col-12 col-sm-8 col-lg-6 text-center mx-auto py-4 px-5 shadow-lg">
              <h2 className="text-center mb-4 fw-bold text-primary">Sign Up</h2>
              <h3 className="text-center instruct text-muted mb-4">
                Please fill in your details to create your account.
              </h3>

              <form className="text-start" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullname" className="form-label fw-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name="full_name"
                    placeholder="Enter Your Full Name"
                    value={registerForm.full_name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={registerForm.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label fw-semibold">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter Your Phone Number"
                    value={registerForm.phone}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="username" className="form-label fw-semibold">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter Your Username"
                    value={registerForm.username}
                    onChange={handleChange}
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
                    name="password"
                    placeholder="Enter Your Password"
                    value={registerForm.password}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password2" className="form-label fw-semibold">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="password2"
                    name="password2"
                    placeholder="Confirm Your Password"
                    value={registerForm.password2}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {loading && (
                  <p className="text-center text-muted">
                    Loading... 
                  </p>
                )}
                {success && (
                  <p className="text-success text-center">{success}</p>
                )}
                {error && (
                  <p className="text-danger text-center">
                    {error?.message || error?.error}
                  </p>
                )}



                <div className="d-grid gap-2 mt-3">
                {loading ? (
                 <button disabled className="btn btn-primary py-2 fw-semibold">
  <i className="fas fa-spinner fa-spin me-2"></i>
  Registering
</button>
                ):(
                  <button
                    type="submit"
                    className="btn btn-primary py-2 fw-semibold"
                  >
                    Register
                  </button>
                ) 
              }
                </div>



                <div className="text-center mt-4">
                  <span className="text-muted">
                    Already have an account?{" "}
                    <NavLink
                      to="/login"
                      className="text-decoration-none fw-semibold text-primary"
                    >
                      Login
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

export default RegisterUser;