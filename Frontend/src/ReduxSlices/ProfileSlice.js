import { createSlice,createAsyncThunk, configureStore } from "@reduxjs/toolkit";
import axiosAPI from "../Axios/axiossetup";



export const ProfileRequest=createAsyncThunk('Profile/ProfileRequest',async (_,{rejectWithValue})=>{

    try{
        const res=await axiosAPI.get("user/UserProfileView");
        return res.data;
    }
    catch (error) {
      // Suppress console errors for 401
      if (error.response?.status === 401) {
        return rejectWithValue({ message: "User not authenticated" });
      }
      return rejectWithValue(error.response?.data || "Profile Data Fetch Failed");
    }
})


export const ProfileDeleteRequest=createAsyncThunk('Profile/ProfileDeleteRequest',async (_,{rejectWithValue})=>{

    try{
        const res=await axiosAPI.delete("user/deleteaccount");
        return res.data;
    }
    catch(error){
        return rejectWithValue(error.response?.data || "Profile Not Deleted")
    }
})


export const ProfileLogoutRequest=createAsyncThunk('Profile/ProfileLogoutRequest',async (_,{rejectWithValue})=>{

    try{
        const res=await axiosAPI.post("user/logout");
        return res.data;
    }
    catch(error){
        return rejectWithValue(error.response?.data || "Logout Not Successfull")
    }
})




export const ProfilePasswordRequest=createAsyncThunk('Profile/ProfilePasswordRequest',async (data,{rejectWithValue})=>{

    try{
        const res=await axiosAPI.post("user/auth/changepassword",data);
        return res.data;
    }
    catch(error){
        return rejectWithValue(error.response?.data || "Password Change Request Failed")
    }
})






export const ProfileUpdateRequest = createAsyncThunk(
  'Profile/ProfileUpdateRequest',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosAPI.patch("user/UserProfileView", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Profile Data Update Failed");
    }
  }
);










const ProfileSlice=createSlice({
    'name':"Profile",
    initialState:{
        loading:false,
        error:null,
        success:null,
        profile:null
    },
    reducers:{
        basicReset:(state)=>{
    state.loading = false;
    state.error = null;
    state.success = null;
        },
        FullReset:(state)=>{
state.loading = false;
    state.error = null;
    state.success = null;
    state.profile=null;
        }

    },
    extraReducers:(builder)=>{

        //FOR LOGIN
            builder.

            addCase(ProfileRequest.pending,(state)=>{
                state.loading=true;

            })
            .addCase(ProfileRequest.fulfilled,(state,action)=>{
                state.loading=false;
                state.success=action.payload.message || "Profile Data Fetching Successfull";
                state.profile = action.payload;

            })
            .addCase(ProfileRequest.rejected,(state,action)=>{
                state.loading=false;
                state.success=null;
                state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Profile Fetching Failed";
            }
        )



            .addCase(ProfileDeleteRequest.pending,(state)=>{
                state.loading=true;
                state.error=null;
                state.success=null;
            })
    .addCase(ProfileDeleteRequest.fulfilled,(state,action)=>{
        state.loading=false;
        state.error=null;
        state.success=action.payload.message;
        state.profile=null;
    })
    .addCase(ProfileDeleteRequest.rejected,(state,action)=>{
        state.success=null;
        state.error =
      typeof action.payload === "string"
        ? action.payload
        : action.payload?.message || "Profile Deletion Failed";
            
    })  












    .addCase(ProfileLogoutRequest.pending,(state)=>{
                state.loading=true;
                state.error=null;
                state.success=null;
            })
    .addCase(ProfileLogoutRequest.fulfilled,(state,action)=>{
        state.loading=false;
        state.error=null;
        state.success=action.payload.message;
        state.profile=null;
    })
    .addCase(ProfileLogoutRequest.rejected,(state,action)=>{
        state.success=null;
        state.profile=null;
        state.error =
      typeof action.payload === "string"
        ? action.payload
        : action.payload?.message || "Logout Failed";
            
    })  



      .addCase(ProfilePasswordRequest.pending,(state)=>{
                state.loading=true;
                state.error=null;
                state.success=null;
            })
    .addCase(ProfilePasswordRequest.fulfilled,(state,action)=>{
        state.loading=false;
        state.error=null;
        state.success=action.payload.message;
    })
    .addCase(ProfilePasswordRequest.rejected,(state,action)=>{
        state.success=null;
        state.error =
      typeof action.payload === "string"
        ? action.payload
        : action.payload?.message || "Password Did not matched or Password characters ar eless than 8";
            
    })  




    ///profile data update
      .addCase(ProfileUpdateRequest.pending,(state)=>{
                state.loading=true;
                state.error=null;
                state.success=null;
            })
    .addCase(ProfileUpdateRequest.fulfilled,(state,action)=>{
        state.loading=false;
        state.error=null;
        state.success=action.payload.message;
        state.profile=action.payload;
    })
    .addCase(ProfileUpdateRequest.rejected,(state,action)=>{
        state.success=null;
        state.error =
      typeof action.payload === "string"
        ? action.payload
        : action.payload?.message || "Profile Update Failed";
            
    })  



    








    }

 
})


export const  {basicReset,FullReset} = ProfileSlice.actions;

export default ProfileSlice.reducer;
