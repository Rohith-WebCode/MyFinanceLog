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
  async (page = 1, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/transactions?pages=${page}`);
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

export const deleteTransactions = createAsyncThunk(
  "transactions/deleteTransactions",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/api/transactions/${id}`);
      return res.data;    
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch");
    }
  }
);


export const getExpense = createAsyncThunk(
  "transactions/getExpense",
  async (page = 1, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/transactions?type=expense&pages=${page}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch");
    }
  }
);

export const getIncome = createAsyncThunk(
  "transactions/getIncome",
  async (page = 1, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/transactions?type=income&pages=${page}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch");
    }
  }
);

export const get30daysExpense = createAsyncThunk(
  "transactions/get30DaysExpense",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/transactions/expense/30days`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch");
    }
  }
);
export const get30daysIncome = createAsyncThunk(
  "transactions/get60DaysIncome",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/transactions/income/30days`);
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
  yearTransactions : [],
  pagination: {
    page: 1,
    totalPages: 1,
    total: 0,
  },
  deleteTransactions:false,
  allExpense:[],
  daysExpense:[],
  allIncome:[],
  chartdataincome:[]
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
            })
      .addCase(getLastMonthTransactions.rejected, (state, action) => {
        console.error("Error fetching transactions:", action.payload);
      })

      .addCase(getFullTransactions.fulfilled, (state, action) => {
              state.allTransactions = action.payload.transaction;   
              state.pagination = {
              page: action.payload.page,
              totalPages: action.payload.totalPages,
              total: action.payload.total,
            };
                                
            })
      .addCase(getFullTransactions.rejected, (state, action) => {
        console.error("Error fetching transactions:", action.payload);
      })

      .addCase(getYearlyAnalytics.fulfilled, (state, action) => {
              state.yearTransactions = action.payload.result;              
            })
      .addCase(getYearlyAnalytics.rejected, (state, action) => {
        console.error("Error fetching transactions:", action.payload);
      })


      .addCase(deleteTransactions.fulfilled, (state, action) => {
              state.deleteTransactions = true;              
            })
      .addCase(deleteTransactions.rejected, (state, action) => {
        console.error("Error delete transactions:", action.payload);
      })

      .addCase(getExpense.fulfilled, (state, action) => {
              state.allExpense = action.payload.transaction;  
              state.pagination = {
              page: action.payload.page,
              totalPages: action.payload.totalPages,
              total: action.payload.total,
            };            
            })
      .addCase(getExpense.rejected, (state, action) => {
        console.error("Error delete transactions:", action.payload);
      })

      .addCase(get30daysExpense.fulfilled, (state, action) => {
              state.daysExpense = action.payload.transaction;             
            })
      .addCase(get30daysExpense.rejected, (state, action) => {
        console.error("Error delete transactions:", action.payload);
      })

      .addCase(getIncome.fulfilled, (state, action) => {
              state.allIncome = action.payload.transaction; 
              state.pagination = {
              page: action.payload.page,
              totalPages: action.payload.totalPages,
              total: action.payload.total,
            };  
                          
            })
      .addCase(getIncome.rejected, (state, action) => {
        console.error("Error delete transactions:", action.payload);
      })


        .addCase(get30daysIncome.fulfilled, (state, action) => {
              state.chartdataincome = action.payload.transaction;             
            })
      .addCase(get30daysIncome.rejected, (state, action) => {
        console.error("Error delete transactions:", action.payload);
      })
   }
})

export const {openDialog,closeDialog,setTransactions,addTransaction} = TransactionSlice.actions;

export default TransactionSlice.reducer;