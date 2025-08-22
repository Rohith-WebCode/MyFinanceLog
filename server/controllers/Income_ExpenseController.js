const Transaction = require("../models/TransactionSchema")

const getLast30DaysExpenses = async(req,res)=>{
    try {
        const thirtyDaysAgo  = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const transaction = await  Transaction.find({  
                    userId:req.user,
                    type:'expense',
                    date:{$gte:thirtyDaysAgo}
                }).sort({date:-1})
              
        res.status(200).json({
            transaction,
        })
    } catch (error) {
         res.status(500).json({ message: 'Failed to fetch 30 days expense transactions', error: err.message });
    }
    
}
const getLast30DaysIncome = async(req,res)=>{
    
try {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate()- 30)

  const transaction =await Transaction.find({
            userId:req.user,
            type:"income",
            date:{$gte:thirtyDaysAgo}
        }).sort({date:-1})

    res.status(200).json({
        transaction
    })
} catch (error) {
     res.status(500).json({ message: 'Failed to fetch 30 days expense transactions', error: error.message });
}

}

module.exports  = {getLast30DaysExpenses,getLast30DaysIncome}