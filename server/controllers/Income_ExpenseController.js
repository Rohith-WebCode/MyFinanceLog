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

const getLast30DaysExpenses = async(req,res)=>{
    try {
        const thirtyDaysAgo  = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        const expense = await Transaction.find({
            userId:req.user,
            type:'expense',
            date:{$gte:thirtyDaysAgo}
        }).sort({date:-1})
        res.status(200).json({expense})
    } catch (error) {
         res.status(500).json({ message: 'Failed to fetch 30 days expense transactions', error: err.message });
    }
    
}
const getLast60DaysIncome = async(req,res)=>{

try {
    const sixtyDaysAgo = new Date()
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate()- 60)

    const income = await Transaction.find({
        userId:req.user,
        type:"income",
        date:{$gte:sixtyDaysAgo}
    }).sort({date:-1})
    res.status(200).json({income})
} catch (error) {
     res.status(500).json({ message: 'Failed to fetch 60 days expense transactions', error: err.message });
}

}

module.exports  = {getIncomeTransactions,getExpenseTransactions,getLast30DaysExpenses,getLast60DaysIncome}