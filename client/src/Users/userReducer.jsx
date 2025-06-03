import { createSlice } from "@reduxjs/toolkit";
import {filterUsers} from "./userIndex.jsx";
import {getUserDetails} from "./userIndex.jsx";
import {getAllMessages} from "./userIndex.jsx"; 
const initialState={
    users:[],
    loading:false,
    messages:[],
    error:null
}
const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        resetUsers:(state)=>{
            state.users = [];
            state.loading = false;
            state.error = null;
        }
    },
    
    extraReducers:(builder)=>{
        builder.addCase(filterUsers.pending,(state)=>{

            state.loading=true;
            state.error=null;
        });
        builder.addCase(filterUsers.fulfilled,(state,action)=>{
            state.loading=false;
            state.users=action.payload;
      
        });
        builder.addCase(filterUsers.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
        builder.addCase(getUserDetails.pending,(state)=>{
            state.loading=true;
            state.error=null;
        });
        builder.addCase(getUserDetails.fulfilled,(state,action)=>{
            state.loading=false;
         
            state.userDetails=action.payload;
        });
        builder.addCase(getUserDetails.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
        builder.addCase(getAllMessages.pending,(state)=>{
            state.loading=true;
            state.error=null;
        });
        builder.addCase(getAllMessages.fulfilled,(state,action)=>{
            state.loading=false;
          
            state.messages=action.payload;
        });
        builder.addCase(getAllMessages.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
})
export const { resetUsers } = userSlice.actions;
export default userSlice.reducer;