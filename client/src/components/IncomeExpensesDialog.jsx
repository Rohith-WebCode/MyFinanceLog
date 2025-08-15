import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "../store/TransactionSlice";
import { IoMdClose } from "react-icons/io";


const IncomeExpensesDialog = () => { 
  const dispatch = useDispatch();
  const { isOpen, type } = useSelector((state) => state.Transaction);

  const handleClose = () => {
    dispatch(closeDialog());
  };

  return (
    <div className="flex gap-3">
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{type === "income" ? "Add Income" : "Add Expense"}
        <Button onClick={handleClose} sx={{position:"absolute", right:0, fontSize:25}}><IoMdClose /></Button>
        </DialogTitle>
        <DialogContent>
        <TextField
            margin="dense"
            label="Title"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
          />
          <TextField
            margin="dense"
            label="type"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default IncomeExpensesDialog