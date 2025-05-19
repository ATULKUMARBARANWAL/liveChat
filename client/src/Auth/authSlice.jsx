import { createSlice } from "@reduxjs/toolkit";
import authReducer from "./authReducer";

const authSlice=createSlice({
    name:"auth",
    initialState:authReducer.initialState,
    reducers:{
        logout:(state)=>{
            state.user=null;
            state.loading=false;
            state.error=null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    },
    extraReducers:authReducer.authExtraReducers

})
export const {logout}=authSlice.actions;
export default authSlice.reducer;