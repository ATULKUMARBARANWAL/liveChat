import { createSlice } from "@reduxjs/toolkit";
import authReducer from "./authReducer";

const authSlice=createSlice({
    name:"auth",
    initialState:authReducer.intialState,
    reducers:{
        logout:(state)=>{
            state.user=null;
            state.loading=false;
            state.error=null;
        }
    },
    extraReducers:authReducer.authExtraReducers

})
export const {logout}=authSlice.actions;
export default authSlice.reducer;