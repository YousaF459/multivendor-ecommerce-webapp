import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../Axios/axiossetup";
import { act } from "react";

// 🔹 Register user
export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosAPI.post("user/register", formData);
      return res.data;
    } catch (error) {
      
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// 🔹 Verify email
export const verifyEmail = createAsyncThunk(
  "register/verifyEmail",
  async (otpData, { rejectWithValue }) => {
    try {
      const res = await axiosAPI.post("user/emailverify", otpData);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Verification failed");
    }
  }
);

// 🔹 Send or resend OTP
export const sendotp = createAsyncThunk(
  "register/sendotp",
  async (emailData, { rejectWithValue }) => {
    try {
      const res = await axiosAPI.post("user/resendotp", emailData);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "OTP request failed");
    }
  }
);

const RegisterSlice = createSlice({
  name: "register",
  initialState: {
    loading: false,
    error: null,
    success: null,
    isRegistered: false,
    isVerified: false,
    registeredEmail: "",
  },

  reducers: {
    resetRegisterState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
    resetAfterVerify: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
    resetVerifyState: (state) => {
      state.isVerified = false;
      state.registeredEmail = "";
      state.isRegistered = false;
    },
  },

  extraReducers: (builder) => {

    
    builder
      // 🔹 Register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.isRegistered = true;
        state.registeredEmail = action.meta.arg.email;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success=null;
       if (action.payload?.email && action.payload?.password) {
  state.error = `Email: ${action.payload.email.join(", ")} | Password: ${action.payload.password.join(", ")}`;
} 
else if (action.payload?.password) {
  state.error = `Password: ${action.payload.password.join(", ")}`;
} 
else if (action.payload?.email) {
  state.error = `Email: ${action.payload.email.join(", ")}`;
} 
else {
  state.error = "Enter all data correctly.";
}
        
        

      })



      // 🔹 Verify email
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.success=action.payload.message;
        if(action.payload.success){
          state.isVerified=true;
        }

    
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })







      // 🔹 Send/Resend OTP
      .addCase(sendotp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })


      .addCase(sendotp.fulfilled, (state, action) => {
        state.loading = false
        state.registeredEmail = action.meta.arg.email;

        if (action.payload.success) {
    state.success = action.payload.message;  // e.g. "New OTP sent successfully"
    state.error = null;

    if (action.payload.code === "USER_ALREADY_VERIFIED") {
      state.isVerified = true;
    }
  } else {
    state.success = null;
    state.error = action.payload.message;  // unlikely since reject handles errors
  }
}
)



      .addCase(sendotp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  resetRegisterState,
  resetAfterVerify,
  resetVerifyState,
} = RegisterSlice.actions;

export default RegisterSlice.reducer;
