const Transaction = require("../models/TransactionSchema")

const getIncomeTransactions= async(req,res)=>{
    try {
        const income = await Transaction.find({userId:req.user,type:'income'}).sort({date:-1})
        res.status(200).json({income})
    } catch (error) {
         res.status(500).json({ message: 'Failed to fetch income transactions', error: err.message });
    }
}

const getExpenseTransactions = async (req,res) =>{
    try {
        const expense =  await Transaction.find({userId:req.user,type:'expense'}).sort({date:-1})
        res.status(200).json({expense})
    } catch (error) {
         res.status(500).json({ message: 'Failed to fetch expense transactions', error: err.message });
    }
}

module.exports  = {getIncomeTransactions,getExpenseTransactions}