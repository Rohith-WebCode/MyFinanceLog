import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/axios";


export const getLastMonthTransactions = createAsyncThunk(
  "transactions/getLastMonthTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/30days/transactions");      
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch");
    }
  }
);

export const getFullTransactions = createAsyncThunk(
  "transactions/getFullTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/transactions");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch");
    }
  }
);

export const getYearlyAnalytics = createAsyncThunk(
  "transactions/getYearlyAnalyticss",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/analytics/yearly");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch");
    }
  }
);

const initialState ={
  isOpen: false,
  type: "" ,
  transactions:[],
  allTransactions:[],
  yearTransactions : []
};



const TransactionSlice = createSlice({
   name:"TransactionSlice",
   initialState,
   reducers:{
    setTransactions:(state,action)=>{
      state.transactions = action.payload
    },
    addTransaction:(state,action)=>{
     state.transactions.push(action.payload)
    },
    openDialog:(state,action)=>{
        state.isOpen  = true;
        state.type = action.payload
    },
    closeDialog:(state) =>{
      state.isOpen = false;
      state.type = ""
    }
   },
   extraReducers:(builder)=>{
    builder
      .addCase(getLastMonthTransactions.fulfilled, (state, action) => {
              state.transactions = action.payload.transaction;
              // console.log(action.payload.transaction);
              // console.log(state.transactions);
              
            })
      .addCase(getLastMonthTransactions.rejected, (state, action) => {
        console.error("Error fetching transactions:", action.payload);
      })

      .addCase(getFullTransactions.fulfilled, (state, action) => {
              state.allTransactions = action.payload.transaction;
              // console.log(action.payload.transaction);
              // console.log(state.yearTransactions);
              
            })
      .addCase(getFullTransactions.rejected, (state, action) => {
        console.error("Error fetching transactions:", action.payload);
      })



      .addCase(getYearlyAnalytics.fulfilled, (state, action) => {
              state.yearTransactions = action.payload.result;
              // console.log(action.payload.transaction);
              // console.log(state.yearTransactions);
              
            })
      .addCase(getYearlyAnalytics.rejected, (state, action) => {
        console.error("Error fetching transactions:", action.payload);
      })
   }
})

export const {openDialog,closeDialog,setTransactions,addTransaction} = TransactionSlice.actions;

export default TransactionSlice.reducer;