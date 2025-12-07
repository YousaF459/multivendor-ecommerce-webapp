import { useState, useEffect, useRef } from "react"; 
import "../Css/VerifyEmail.css"; 
import { useDispatch, useSelector } from "react-redux"; 
import { verifyEmail, sendotp, resetRegisterState, resetAfterVerify, resetVerifyState, } from "../ReduxSlices/RegisterSlice"; 
import { useNavigate } from "react-router-dom"; 

function EmailOTPVerify() { 
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 
  const { loading, success, error, registeredEmail, isRegistered, isVerified } = useSelector((state) => state.register); 
  
  const [emailVerify, setEmailVerify] = useState({ email: "", otp: "" }); 
  const [canResend, setCanResend] = useState(true); 
  const [timer, setTimer] = useState(300); // 5 min countdown 
  const intervalRef = useRef(null); 
  const countRef=useRef(0) 
  
  // Prefill email if already registered 
  useEffect(() => { 
    if (registeredEmail) { 
      setEmailVerify((prev) => ({ ...prev, email: registeredEmail })); 
    } 
  }, [registeredEmail]); 
  
  // Handle input changes 
  function handleChange(e) { 
    setEmailVerify({ ...emailVerify, [e.target.name]: e.target.value }); 
  } 
  
  // Verify OTP 
  function handleVerification(e) { 
    e.preventDefault(); 
    dispatch(verifyEmail(emailVerify)); 
    dispatch(resetAfterVerify()); 
  } 
  
  // Start the countdown timer 
  function startTimer() { 
    setTimer(300); // 5 min 
    setCanResend(false); 
    
    if(countRef.current === 0){ 
      countRef.current = 1; 
    } 
    else if(countRef.current === 1 && success ){ 
      countRef.current = 0; 
    } 
    
    if (intervalRef.current) clearInterval(intervalRef.current); 
    
    intervalRef.current = setInterval(() => { 
      setTimer((prev) => { 
        if (prev <= 1) { 
          clearInterval(intervalRef.current); 
          intervalRef.current = null; 
          setCanResend(true); 
          return 0; 
        } 
        return prev - 1; 
      }); 
    }, 1000); 
  } 
  







  // Send or resend OTP 
  function handleResendOTP() { 
    const email = emailVerify.email || registeredEmail; 
    if (!email) return; 
    
    dispatch(sendotp({ email })) 
      .unwrap() 
      .then((res) => { 
  
        if(!success || !error){ 
          startTimer();
        }
       

        // start timer after OTP successfully sent 
      }) 
      .catch((err) => { 
        console.error("OTP send failed:", err); 
      }); 
  } 












  
  // Auto-start timer if user came from registration 
  useEffect(() => { 
    if (isRegistered ) startTimer(); 
    
    return () => { 
      if (intervalRef.current) clearInterval(intervalRef.current); 
    }; 
  }, [isRegistered]); 
  
  // Navigate after successful verification 
  useEffect(() => { 
    if (isVerified) { 
      navigate("/login"); 
      dispatch(resetVerifyState()); 
      dispatch(resetRegisterState())
    } 
  }, [isVerified, navigate, dispatch]); 

  
  useEffect(()=>{ 
    let timeout; 
    if(success || error){ 
      setCanResend(true) 
      timeout=setTimeout(()=>{ 
        dispatch(resetRegisterState()) 
      },2500) 
    } 
    return ()=>{clearTimeout(timeout)} 
  },[success,error,dispatch]) 
  
  return ( 
   <>
      <div className="container-fluid containerFuildDesign py-5">
        <div className="container mt-5">
          <div className="row">
            <div className="formHolder col-12 col-sm-8 col-lg-5 text-center mx-auto py-5 px-5 shadow-lg">
              <h2 className="text-center mb-4 fw-bold text-primary">
                Email Verification
              </h2>
              <h3 className="text-center instruct text-muted mb-4">
                Only registered users can verify their email.
              </h3>

              <form className="text-start" onSubmit={handleVerification}>
                {/* Email input */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Enter Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    name="email"
                    value={emailVerify.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* OTP input */}
                <div className="mb-3">
                  <label htmlFor="otp" className="form-label fw-semibold">
                    OTP Code
                  </label>
                  <input
                    type="text"
                    id="otp"
                    placeholder="Enter OTP"
                    name="otp"
                    value={emailVerify.otp}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Resend / Send OTP */}
                <div className="text-center mb-3">
                  {canResend && countRef.current === 0 ? (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      className="btn btn-outline-primary fw-semibold"
                    >
                      Send OTP
                    </button>
                  ) : canResend && countRef.current > 0 ? (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      className="btn btn-outline-primary fw-semibold"
                    >
                      Resend OTP
                    </button>
                  ) : (
                    <span className="text-muted">{`Resend OTP in ${timer}s`}</span>
                  )}
                </div>

                {/* Messages */}
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

                <div className="d-grid gap-2 mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary py-2 fw-semibold"
                  >
                    Verify
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  ); 
} 

export default EmailOTPVerify;
