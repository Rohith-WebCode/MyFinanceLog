import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState ={
  isOpen: false,
  type: "" 
};

const TransactionSlice = createSlice({
   name:"TransactionSlice",
   initialState,
   reducers:{
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

export const {openDialog,closeDialog} = TransactionSlice.actions;

export default TransactionSlice.reducer;