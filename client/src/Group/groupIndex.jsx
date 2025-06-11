import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from 'axios';

export const createGroup=createAsyncThunk(
    'group/createGroup',
async (userData, { rejectWithValue }) => {
  try {

const response=await axios.post('http://localhost:3000/api/group/createGroup',{
        'admin': userData.admin,
    'name': userData.name,
    'description': userData.description,
    'members': userData.members},{
headers: { 'Content-Type': 'application/json' }

})

    return response.data;
  } catch (err) {
if(axios.isAxiosError(err))
{
    return rejectWithValue(err.response?.data?.message || err.message)
}
return rejectWithValue(err.message)
  }
}


)
// Frontend thunk
export const allGroup = createAsyncThunk(
  'group/allGroup',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/group/allGroups/${userId}`, {
        headers: { 'Content-Type': 'application/json' }
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
export const allgroupMessage=createAsyncThunk(
  'group/allgroupMessage',
  async (groupId,{rejectWithValue})=>{
    try{
    
     const response=await axios.get(`http://localhost:3000/api/messages/allgroupMessage/${groupId}`,{
      headers:{'Content-Type':'application/json'}
     })
     console.log(response.data)
     return response.data;
    }
    catch(err)
    {
      if(axios.isAxiosError(err)){
        return rejectWithValue(err.response?.data?.message || err.message)
      }
      return rejectWithValue(err.message)
    }
  }
)
