import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState ={
  isOpen: false,
  type: "" ,
  transactions:[]
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
   }
})

export const {openDialog,closeDialog,setTransactions,addTransaction} = TransactionSlice.actions;

export default TransactionSlice.reducer;