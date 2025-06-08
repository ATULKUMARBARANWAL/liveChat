import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const filterUsers = createAsyncThunk(
  "user/filterUsers",
  async (Query, { rejectWithValue }) => {
    try {

      const response = await axios.get(`http://localhost:3000/api/user/filtered/${Query}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      return response.data; // ✅ Return data
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.message || err.message);
      }
      return rejectWithValue(err.message);
    }
  }
)
export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (userId, { rejectWithValue }) => {
    try{
   
const response=await axios.get(`http://localhost:3000/api/user/userDetails/${userId}`, {
  headers: {
    "Content-Type": "application/json",
  },
});

      return response.data;
    }
    catch(err)
    {
      if(axios.isAxiosError(err))
      {
        return rejectWithValue(err.response?.data?.message || err.message)
      }
      return rejectWithValue(err.message)
    }
  }
)
export const getAllMessages = createAsyncThunk(
  "user/getAllMessages",
  async ({ userId, userId2 }, { rejectWithValue }) => {
    try {
     

      const response = await axios.get(`http://localhost:3000/api/messages/receiveMessages/${userId}/${userId2}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.message || err.message);
      }
      return rejectWithValue(err.message);
    }
  }
);
