// videoCallSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVideoCall: false,
  callData: null,  // ✅ Store sender, receiver, etc.
  loading: false,
  error: null
};

const videoCallSlice = createSlice({
  name: "videoCall",
  initialState,
  reducers: {
    setCallData: (state, action) => {
        console.log('Setting call data:', action.payload);
      state.callData = action.payload;
    }
  }
});

export const { setCallData } = videoCallSlice.actions;
export default videoCallSlice.reducer;
