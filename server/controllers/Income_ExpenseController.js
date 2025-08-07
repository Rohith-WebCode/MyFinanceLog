const Transaction = require("../models/TransactionSchema")

const getIncomeTransactions= async(req,res)=>{

    const page = Math.max(parseInt(req.query.pages) || 1,1)
    const limit = 10
    const skip = (page-1)*limit
    try {
        const [transaction,total] = await Promise.all([
            Transaction.find({userId:req.user,type:"income"})
            .sort({date:-1})
            .skip(skip)
            .limit(limit),
            Transaction.countDocuments({userId:req.user})
        ])
        res.status(200).json({
            transaction,
            page,
            totalPages:Math.ceil(total/limit),
            total
        })
    } catch (error) {
         res.status(500).json({ message: 'Failed to fetch income transactions', error: err.message });
    }
}

const getExpenseTransactions = async (req,res) =>{
    const page = Math.max(parseInt(req.query.pages) || 1,1)
    const limit = 10
    const skip = (page-1)*limit
    try {
        const [transaction,total] = await Promise.all([
            Transaction.find({userId:req.user,type:"expense"})
            .sort({date:-1})
            .skip(skip)
            .limit(limit),
            Transaction.countDocuments({userId:req.user})
        ])
        res.status(200).json({
            transaction,
            page,
            totalPages:Math.ceil(total/limit),
            total
        })
    } catch (error) {
         res.status(500).json({ message: 'Failed to fetch expense transactions', error: err.message });
    }
}

const getLast30DaysExpenses = async(req,res)=>{
    const pages = Math.max(parseInt(req.query.pages) || 1,1)
    const limit = 10
    const skip = (pages - 1) *limit
    try {

        const thirtyDaysAgo  = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const [transaction,total] = await Promise.all([
        Transaction.find({  
                    userId:req.user,
                    type:'expense',
                    date:{$gte:thirtyDaysAgo}
                })
                .sort({date:-1})
                .skip(skip)
                .limit(limit),
                Transaction.countDocuments({userId:req.user})     
        ]) 
        res.status(200).json({
            transaction,
            pages,
            totalPages:Math.ceil(total/limit),
            total
        })
    } catch (error) {
         res.status(500).json({ message: 'Failed to fetch 30 days expense transactions', error: err.message });
    }
    
}
const getLast60DaysIncome = async(req,res)=>{
    const pages = Math.max(parseInt(req.query.pages) || 1,1)
    const limit = 10
    const skip = (pages - 1) *limit

try {
    const sixtyDaysAgo = new Date()
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate()- 60)
    const [transaction,total] = await Promise.all([
        Transaction.find({
            userId:req.user,
            type:"income",
            date:{$gte:sixtyDaysAgo}
        }).sort({date:-1})
        .skip(skip)
        .limit(limit),
        Transaction.countDocuments({userId:req.user})    
    ])
    res.status(200).json({
        transaction,
        pages,
        totalPages:Math.ceil(total/limit),
        total
    })
} catch (error) {
     res.status(500).json({ message: 'Failed to fetch 60 days expense transactions', error: err.message });
}

}

module.exports  = {getIncomeTransactions,getExpenseTransactions,getLast30DaysExpenses,getLast60DaysIncome}