import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/axios";

// Get user on refresh
export const getMe = createAsyncThunk('auth/profile', async () => { 
  const res = await api.get('/api/profile');
  return res.data;
  console.log(res.data);
  
});


export const logOut = createAsyncThunk('auth/logout',async()=>{
    await api.post('/api/auth/logout')
})


const initialState ={
    user:null,
    token:null,
    login:false
};


const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        loginSuccess:(state,action)=>{
            state.user = action.payload.user;
            // state.token = action.payload.token;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getMe.fulfilled,(state,action)=>{
            state.user = action.payload.user
        })

        .addCase(logOut.fulfilled,(state)=>{
            state.user = null
        })
    }
})


export const {loginSuccess} = authSlice.actions;

export default authSlice.reducer;