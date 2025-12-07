import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../Axios/axiossetup";





export const passwordResetUserEmail=createAsyncThunk("passwordResetUser/passwordResetUserEmail",async (data,{rejectWithValue})=>{

    try{
        const res=await axiosAPI.post("user/passwordresetemail",data);
        return res.data; 

    }
    catch(error){
        return rejectWithValue(error.response?.data || "Enter Correct Email")
    }
})



export const newUserPassword=createAsyncThunk("passwordResetUser/newUserPassword",async (data,{rejectWithValue})=>{

    try{
        const res=await axiosAPI.post("user/PasswordResetConfirm",data);
        return res.data; 

    }
    catch(error){
        return rejectWithValue(error.response?.data || "Enter Correct Email")
    }
})



const passwordResetUserSlice=createSlice({
    name:"passwordResetUser",
    initialState:{
        loading:false,
        error:null,
        success:null,
    },
    reducers:{
        resetState:(state)=>{
            state.loading=false,
            state.error=null,
            state.success=null

        },
       
    },
    extraReducers:
        (builder)=>{

        // For Email Sending
        builder.

        addCase(passwordResetUserEmail.pending,(state)=>{
            state.loading=true;
        })

        .addCase(passwordResetUserEmail.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=action.payload.message;
        })

        .addCase(passwordResetUserEmail.rejected,(state,action)=>{
            state.success=null;
            state.loading=false;
            state.error=action.payload?.message ||  (typeof action.payload === "string" ? action.payload : "Enter Correct Email");
        })

        
         // For New Password

        .addCase(newUserPassword.pending,(state)=>{
            state.loading=true;
        })

        .addCase(newUserPassword.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=action.payload.message;
          
        })

        .addCase(newUserPassword.rejected,(state,action)=>{
            state.loading=false;
            state.success=null;
            state.error=action.payload?.message ||  (typeof action.payload === "string" ? action.payload : "Failed to reset password");
        })




    }
})



export const { resetState } = passwordResetUserSlice.actions;
export default passwordResetUserSlice.reducer;