import { configureStore } from '@reduxjs/toolkit';
import UserRegister from '../ReduxSlices/RegisterSlice'
import UserPassword from '../ReduxSlices/PasswordResetUser'
import LoginReducer from '../ReduxSlices/LoginSlice'
import ProfileReducer from  '../ReduxSlices/ProfileSlice'

const store=configureStore({
    reducer:{
        register:UserRegister,
        resetPassword:UserPassword,
        LoginReducer:LoginReducer,
        ProfileReducer:ProfileReducer,
    }
}
)


export default store;