const Transaction = require("../models/TransactionSchema")

const addTransaction = async (req,res)=>{
      const { title, amount, type, category, date } = req.body;
      try {
        const newTransaction = new Transaction({
            userId:req.user,
            title,
            amount,
            type,
            category,
            date,
        })
       const save = await newTransaction.save()
       res.status(201).json(save);   
      } catch (error) {
        res.status(500).json({ message: 'Failed to add transaction', error: error.message });
      }
}

const getTransactions = async (req,res)=>{
    try {
        console.log(req.user);
        const transaction = await Transaction.find({user:req.user}).sort({date:-1})
        res.status(200).json({transaction})
    } catch (error) {
         res.status(500).json({ message: 'Failed to fetch transactions', error: error.message });
    }
}

const deleteTransaction  =async (req,res)=>{
  try {
    const deletedTransaction   = await Transaction.findByIdAndDelete({
      _id:req.params.id,
      userId:req.user
    })
       if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

     res.status(200).json({ message: 'Transaction deleted successfully' });
    
  } catch (error) {
    console.error(error); // Optional for debugging
    res.status(500).json({ message: 'Failed to delete transaction', error: error.message });
  }
}


module.exports = {addTransaction,getTransactions,deleteTransaction}