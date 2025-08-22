import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, InputLabel, Select, MenuItem, FormControl } from "@mui/material"
import { useDispatch, useSelector} from "react-redux";
import { addTransaction, closeDialog, getExpense, getFullTransactions, getIncome, getLastMonthTransactions, getYearlyAnalytics } from "../store/TransactionSlice";
import { IoMdClose } from "react-icons/io";
import api from "../utils/axios"
import { toast } from "react-toastify";


const IncomeExpensesDialog = () => { 
  const dispatch = useDispatch();
  const { isOpen, type } = useSelector((state) => state.Transaction);
    
const incomeCategories = [
  { key: "salary", label: "salary" },
  { key: "business", label: "business" },
  { key: "investment", label: "investment" },
  { key: "other-income", label: "other-income" },
];

const expenseCategories = [
  { key: "food", label: "food" },
  { key: "transport", label: "transport" },
  { key: "shopping", label: "shopping" },
  { key: "entertainment", label: "entertainment" },
  { key: "bills", label: "bills" },
  { key: "other-expense", label: "other-expense" },
];

  const [formData, setFormData] = useState({
    title:"",
    amount: "",
    category: "",
    type:"",
    date:""
  });  
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  useEffect(() => {
  setFormData((prev) => ({ ...prev, type }));
  formData.category = ""
  }, [type]);

      const handleSubmit = async () => {
        const { title, amount, category, date, type } = formData;

        if (!title || !amount || !category || !date) {
          toast.error("All fields are required!");
          return;
        }

        try {
          const res = await api.post("/api/transactions", formData);
          if (res.status === 201) {
            dispatch(addTransaction(res.data.transaction))
            toast.success(res.data.message || `${type} added!`);
            dispatch(getIncome());
            dispatch(getExpense());
            dispatch(getFullTransactions()) 
            dispatch(getYearlyAnalytics())
            dispatch(getLastMonthTransactions()) 
            setFormData({ title: "", amount: "", category: "", type, date: "" });
          } else {
            toast.error(res.data.message || "Something went wrong!");
          }
        } catch (err) {
          toast.error("Server error. Please try again.");
        }
      };

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
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            margin="dense"
            type="number"
            label="Amount"
            name="amount"
            required
            value={formData.amount}
            onChange={handleChange}
            InputProps={{
                inputProps: { 
                  style: { MozAppearance: "textfield" } 
                }
              }}
              sx={{
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                }
              }}
            fullWidth
          />
        <FormControl fullWidth margin="dense">
          <InputLabel>Category</InputLabel>
        <Select
            name="category"
            value={formData.category}
            required
            onChange={handleChange}
          >
            {(type === "income" ? incomeCategories : expenseCategories).map((cat) => (
            <MenuItem key={cat.key} value={cat.label}>
              {cat.label}
            </MenuItem>
          ))}
          </Select>
        </FormControl>
        <TextField
            margin="dense"
            name="date"
            type="date"
            required
            value={formData.date}
            onChange={handleChange}
            fullWidth
        />
      
        </DialogContent>
        <DialogActions onClose={handleClose}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default IncomeExpensesDialog