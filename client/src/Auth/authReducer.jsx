import { registerUser } from "./authIndex";
import { loginUser } from "./authIndex";
const initialState={
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading:false,
    error:null
}

const authExtraReducers=(builder)=>{
    builder.addCase(registerUser.pending,(state)=>{
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
    })
    builder.addCase(loginUser.pending,(state)=>{
        state.loading=true;
        state.error=null;
    })
builder.addCase(loginUser.fulfilled,(state,action)=>{
    state.loading=false;
    state.user=action.payload;
    localStorage.setItem("user",JSON.stringify(action.payload))
    localStorage.setItem("token",action.payload.token)
})
builder.addCase(loginUser.rejected,(state,action)=>{
    state.loading=false;
    state.error=action.payload;
})
    
}
const authReducerData = { initialState, authExtraReducers };

export default authReducerData;