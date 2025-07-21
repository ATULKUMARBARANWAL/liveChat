import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Auth/authReducer.jsx";
import authSlice from "../Auth/authSlice.jsx";
import userSlice from "../Users/userReducer.jsx"
import groupSlice from "../Group/groupReducer.jsx"
import videoCallSlice from "../videoCall/peerToPeerCallReducer.jsx";
const store=configureStore({
    reducer:{
        auth:authSlice,
        user:userSlice,
        group:groupSlice,
        videoCall: videoCallSlice

    }
})
export default store;
