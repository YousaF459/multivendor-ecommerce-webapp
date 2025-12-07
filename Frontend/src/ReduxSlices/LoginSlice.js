import { createSlice,createAsyncThunk, configureStore } from "@reduxjs/toolkit";
import axiosAPI from "../Axios/axiossetup";




export const LoginRequest=createAsyncThunk('login/LoginRequest',async (data,{rejectWithValue})=>{

    try{
        const res=await axiosAPI.post("user/login",data);
        return res.data;
    }
    catch(error){
        return rejectWithValue(error.response?.data || "Login Failed")
    }
})



const LoginSlice=createSlice({
    'name':"login",
    initialState:{
        loading:false,
        error:null,
        success:null,
    },
    reducers:{
        basicReset:(state)=>{
    state.loading = false;
    state.error = null;
    state.success = null;
        }

    },
    extraReducers:(builder)=>{

        //FOR LOGIN
            builder.

            addCase(LoginRequest.pending,(state)=>{
                state.loading=true;

            })
            .addCase(LoginRequest.fulfilled,(state,action)=>{
                state.loading=false;
                state.success=action.payload.message || "Login Successfull";


            })
            .addCase(LoginRequest.rejected,(state,action)=>{
                state.loading=false;
                state.success=null;
                state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Login Failed";
            })
    }
})


export const { basicReset } = LoginSlice.actions;
export default LoginSlice.reducer;