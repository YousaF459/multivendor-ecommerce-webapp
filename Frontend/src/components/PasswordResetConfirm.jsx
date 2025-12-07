import { NavLink,useNavigate } from 'react-router-dom';
import '../Css/PasswordResetConfirm.css'; // separate CSS file
import { useState,useEffect } from 'react';
import { resetState} from '../ReduxSlices/PasswordResetUser';
import {newUserPassword} from '../ReduxSlices/PasswordResetUser'
import { useSelector,useDispatch } from 'react-redux';
import { useLocation,useParams } from "react-router-dom";

function PasswordResetConfirm() {

  const navigate=useNavigate()
   const dispatch=useDispatch()  
  const {error,loading,success}=useSelector(state => state.resetPassword)

   const { uidb64, token } = useParams();




const [passwordReset, setpasswordReset] = useState({
  newPassword: "",
  confirmPassword: "",
  uidb64: uidb64 || "",
  token: token || "",
});





  function handleChange(e){
    setpasswordReset({...passwordReset,[e.target.name]:e.target.value})
  }

  function handleSubmit(e){
    e.preventDefault();


    
    dispatch(newUserPassword(passwordReset))
  .unwrap()
  .then(() => {
    navigate('/login')// clear after 3 seconds
  })
  .catch(() => {});
    
  }

  useEffect(()=>{

    return ()=>{dispatch(resetState())}
  },[dispatch])




  return (
     <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="col-12 col-md-6 col-lg-4 bg-white rounded-4 shadow p-4">
        <h3 className="text-center mb-4 fw-semibold">Set New Password</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="new-password" className="form-label fw-semibold">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              name="newPassword"
              placeholder="Enter New Password"
              value={passwordReset.newPassword}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="confirm-password" className="form-label fw-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={passwordReset.confirmPassword}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          {loading && <p className="text-muted text-center">Loading...</p>}
          {error && <p className="text-danger text-center">{error}</p>}
          {success && <p className="text-success text-center">{success}</p>}

          <button type="submit" className="btn btn-primary w-100 py-2 rounded-3 mt-3">
            Reset Password
          </button>

          <div className="text-center mt-3">
            <small className="text-muted">
              Remembered your password?{' '}
              <NavLink to="/login" className="text-decoration-none fw-semibold">
                Login
              </NavLink>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordResetConfirm;