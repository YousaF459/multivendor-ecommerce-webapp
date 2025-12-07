import "../Css/UserProfileView.css";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {basicReset,FullReset} from '../ReduxSlices/ProfileSlice';
import {ProfileRequest,ProfileDeleteRequest,ProfileLogoutRequest,ProfilePasswordRequest,ProfileUpdateRequest} from '../ReduxSlices/ProfileSlice';
import { useDispatch, useSelector } from "react-redux"; 
import axiosAPI from "../Axios/axiossetup";
import {useAuth} from '../ContextStore/UserAuth.jsx'

function UserProfileView() {
  const navigate = useNavigate();



 const { loggedIn, setLoggedIn } = useAuth();
  const dispatch=useDispatch();
  const {error,success,loading,profile} = useSelector((state)=> state.ProfileReducer)
 

  // ---------------- Profile State ----------------
  const [profileData, setProfileData] = useState({
    full_name: "",
    about: "",
    gender: "",
    country: "",
    state: "",
    city: "",
    address: "",
  });

  // ---------------- Password State ----------------
  const [passwordChange, setPasswordChange] = useState({
    old_password: "",
    new_password: "",
    new_password2: "",
  });

  // ---------------- Fetch Profile Data ----------------


  // ---------------- Handlers ----------------
  function handleProfileChange(e) {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  }

function handleProfileSubmit(e) {
  e.preventDefault();
  dispatch(ProfileUpdateRequest(profileData))
    .unwrap()
    .then(() => {
      window.alert("Profile Updated Successfully");
    })
    .catch((error) => {
     // Log error for debugging
      window.alert(`Profile Update Failed: ${JSON.stringify(error)}`);
    });
}




  function handlePasswordChange(e) {
    setPasswordChange({ ...passwordChange, [e.target.name]: e.target.value });
  }

  function handlePasswordSubmit(e) {
    e.preventDefault();

    dispatch(ProfilePasswordRequest(passwordChange))
    .unwrap()
    .then(()=>{
    window.alert("Password Changed Successfully")
    setPasswordChange( 
    {old_password: "",
    new_password: "",
    new_password2: ""})
    }
    )
    .catch((error)=>{

    window.alert("Password Did not matched or Password characters ar eless than 8")
    setPasswordChange( 
    {old_password: "",
    new_password: "",
    new_password2: ""})
    }
    )
    
    // later: dispatch redux action to change password
  }




  function handelLogout(){
    dispatch(ProfileLogoutRequest())
    .unwrap()
    .then(()=>{
      setLoggedIn(false);
      dispatch(FullReset())
      
      navigate('/login')
      
    })
  }



 async function handleDelete() {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete your account? This action cannot be undone."
  );

  if (!confirmDelete) return;

  try {
    // Delete profile
    await dispatch(ProfileDeleteRequest()).unwrap();

    // Logout
    await dispatch(ProfileLogoutRequest()).unwrap();

    // Update local state and reset redux
    setLoggedIn(false);
    dispatch(FullReset());

    // Navigate to login page
    navigate('/login');
  } catch (error) {
    console.error("Error deleting account or logging out:", error);
    // You can also show a toast/alert here
  }
}




  useEffect(() => {
  if (profile) {
    setProfileData({
      full_name: profile.full_name || "",
      about: profile.about || "",
      gender: profile.gender || "",
      country: profile.country || "",
      state: profile.state || "",
      city: profile.city || "",
      address: profile.address || "",

    });
  }
}, [profile]);






 useEffect(() => {
     const checkLoginAndFetchProfile = async () => {
      try {
        // 1️⃣ Check if user is logged in (refresh cookie exists & valid)
        const res = await axiosAPI.get(
          "user/authviewcheck",
          { withCredentials: true }
        );

        if (!res.data.isLoggedIn) {
          setLoggedIn(false);
          
          console.log("called",loggedIn,res.data.isLoggedIn);
          
          return; // stop here, don’t fetch profile
        }

        // 2️⃣ User is logged in → fetch profile
        setLoggedIn(true);
        const profileRes = await dispatch(ProfileRequest()).unwrap();
        dispatch(basicReset());
  
      } catch (err) {

      }
    };

    checkLoginAndFetchProfile();
  }, [dispatch,navigate,loggedIn]);









  // ---------------- UI ----------------
 return (
   <>
      <div className="container-fluid containerFuildDesign py-5">
        <div className="container mt-5">
          {!profile ? (
            <div className="row">
              <div className="formHolder col-12 col-sm-8 col-lg-6 text-center mx-auto py-5 px-5 shadow-lg">
                <h2 className="text-center mb-4 fw-bold text-primary">
                  User Profile
                </h2>
                <p className="text-muted mb-4">
                  You must log in to view your profile.
                </p>
                <button
                  className="btn btn-primary fw-semibold"
                  onClick={() => navigate("/login")}
                >
                  Go to Login
                </button>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="formHolder col-12 col-lg-8 mx-auto py-5 px-5 shadow-lg">
                <h2 className="text-center mb-4 fw-bold text-primary">
                  User Profile
                </h2>

                {loading && (
                  <p className="text-center text-muted">Loading...</p>
                )}
                {success && (
                  <p className="text-success text-center">{success}</p>
                )}
                {error && (
                  <p className="text-danger text-center">
                    {error?.message || error?.error || JSON.stringify(error)}
                  </p>
                )}

                {/* Profile Update */}
                <form className="text-start" onSubmit={handleProfileSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter full name"
                        name="full_name"
                        value={profileData.full_name}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        Gender
                      </label>
                      <select
                        name="gender"
                        className="form-select"
                        value={profileData.gender}
                        onChange={handleProfileChange}
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label fw-semibold">About</label>
                      <textarea
                        className="form-control"
                        placeholder="Tell something about yourself"
                        name="about"
                        rows="3"
                        value={profileData.about}
                        onChange={handleProfileChange}
                      ></textarea>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        Country
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter country"
                        name="country"
                        value={profileData.country}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">State</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter state"
                        name="state"
                        value={profileData.state}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">City</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter city"
                        name="city"
                        value={profileData.city}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter address"
                        name="address"
                        value={profileData.address}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>

                  <div className="d-grid mt-3">
                    <button type="submit" className="btn btn-primary fw-semibold">
                      Update Profile
                    </button>
                  </div>
                </form>

                {/* Password Change */}
                <hr className="my-5" />
                <h4 className="fw-bold text-primary mb-4 text-center">
                  Change Password
                </h4>

                <form className="text-start" onSubmit={handlePasswordSubmit}>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-semibold">
                        Old Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter old password"
                        name="old_password"
                        value={passwordChange.old_password}
                        onChange={handlePasswordChange}
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-semibold">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter new password"
                        name="new_password"
                        value={passwordChange.new_password}
                        onChange={handlePasswordChange}
                      />
                    </div>

                    <div className="col-md-4 mb-4">
                      <label className="form-label fw-semibold">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm new password"
                        name="new_password2"
                        value={passwordChange.new_password2}
                        onChange={handlePasswordChange}
                      />
                    </div>
                  </div>

                  <div className="d-grid mt-2">
                    <button
                      type="submit"
                      className="btn btn-outline-primary fw-semibold"
                    >
                      Change Password
                    </button>
                  </div>
                </form>

                {/* Logout and Delete */}
                <div className="d-flex justify-content-between mt-5">
                  <button
                    className="btn btn-danger fw-semibold"
                    onClick={handleDelete}
                  >
                    Delete Account
                  </button>
                  <button
                    className="btn btn-secondary fw-semibold"
                    onClick={handelLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
);

}


export default UserProfileView;