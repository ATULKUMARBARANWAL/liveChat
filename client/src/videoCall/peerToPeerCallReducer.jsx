// videoCallSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVideoCall: false,
  callData: null,  // ✅ Store sender, receiver, etc.
  loading: false,
  error: null,
  answerVideoCall: null, 
};

const videoCallSlice = createSlice({
  name: "videoCall",
  initialState,
  reducers: {
    setCallData: (state, action) => {
        console.log('Setting call data:', action.payload);
      state.callData = action.payload;
    },
    answerVideoCall: (state, action) => {
     console.log('Answering video call:', action.payload);
      state.answerVideoCall = action.payload;  // ✅ Store call data
    }
  }

});

export const { setCallData, answerVideoCall } = videoCallSlice.actions;
export default videoCallSlice.reducer;
