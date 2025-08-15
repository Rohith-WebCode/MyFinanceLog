import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'
import TransactionSlice from './TransactionSlice'

export const store  = configureStore({
    reducer:{
        auth:authReducer,
        Transaction:TransactionSlice
    }
})