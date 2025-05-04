import { registerUser } from "./authIndex";
const intialState={
    user:null,
    loading:false,
    error:null
}
const authExtraReducers=(builder)=>{
    console.log("this will run")
    builder.addCase(registerUser.pending,(state,action)=>{
        state.loading=true;
        state.error=null;
    });
    builder.addCase(registerUser.fulfilled,(state,action)=>{
     state.loading=false;
     state.user=action.payload;
    });
    builder.addCase(registerUser.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    }
)
    
}
const authReducerData = { intialState, authExtraReducers };

export default authReducerData;