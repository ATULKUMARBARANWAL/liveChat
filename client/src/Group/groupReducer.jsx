import { createSlice } from "@reduxjs/toolkit";
import { createGroup } from "./groupIndex";
import { allGroup } from "./groupIndex";
const initialState={
    groups:[],
    loading:false,
    error:null
}

const groupSlice=createSlice({
    name:"group",
    initialState,
    reducer:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(createGroup.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(createGroup.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.groups.push(action.payload)
        })
        .addCase(createGroup.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(allGroup.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
       .addCase(allGroup.fulfilled, (state, action) => {
  state.groups = action.payload.data; // just the array
})

        .addCase(allGroup.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
    }

})
export default groupSlice.reducer;