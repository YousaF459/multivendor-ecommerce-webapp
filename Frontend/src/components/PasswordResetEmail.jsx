import { NavLink , useNavigate } from 'react-router-dom';
import '../Css/PasswordResetEmail.css'
import { useEffect, useState } from 'react';
import { resetState} from '../ReduxSlices/PasswordResetUser'
import {passwordResetUserEmail} from '../ReduxSlices/PasswordResetUser'
import { useDispatch,useSelector} from 'react-redux';

function PasswordResetEmail() {

  const dispatch=useDispatch()  
  const {error,loading,success}=useSelector(state => state.resetPassword)
  const [emailReset,setemailReset]=useState({
    "email":""
  })
  const navigate=useNavigate()



  function handleChange(e){
    setemailReset({...emailReset,[e.target.name]:e.target.value})
  }

  function handleSubmit(e){
    e.preventDefault();
  

    dispatch(passwordResetUserEmail({"email": emailReset.email}))
    .unwrap()
    .then(() => {
      // navigate to email verification page only after successful registration
   
    
   })
  .catch((err) => {
   
  });  

  }



  useEffect(()=>{
    return ()=>{dispatch(resetState())}
  },[dispatch])




  return (
     <>
      <div className="container-fluid containerFuildDesign py-5">
        <div className="container mt-5">
          <div className="row">
            <div className="formHolder col-12 col-sm-8 col-lg-5 text-center mx-auto py-4 px-5 shadow-lg">
              <h2 className="text-center mb-4 fw-bold text-primary">Reset Password</h2>
              <h3 className="text-center instruct text-muted mb-4">
                Only registered users can reset their password.
              </h3>

              <form className="text-start" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={emailReset.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {loading && (
                  <p className="text-center text-muted">
                    Loading... Check your Gmail & spam folder.
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
                  <button type="submit" className="btn btn-primary py-2 fw-semibold">
                    Send Reset Link
                  </button>
                </div>

                <div className="text-center mt-4">
                  <span className="text-muted">
                    Remember your password?{" "}
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

export default PasswordResetEmail;
