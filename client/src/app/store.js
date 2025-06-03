import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Auth/authReducer.jsx";
import authSlice from "../Auth/authSlice.jsx";
import userSlice from "../Users/userReducer.jsx"
const store=configureStore({
    reducer:{
        auth:authSlice,
        user:userSlice,
    }
})
export default store;
