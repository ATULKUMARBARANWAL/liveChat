import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Auth/authReducer.jsx";
import authSlice from "../Auth/authSlice.jsx";

const store=configureStore({
    reducer:{
        auth:authSlice,
    }
})
export default store;
