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
  const page  =Math.max (parseInt(req.query.pages) || 1,1)
  const limit = 10
  const skip  = (page - 1)*limit
    try {
        const [transaction,total]= await Promise.all([
          Transaction.find({userId:req.user})
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

const searchTransaction = async (req,res)=>{
  const search = req.query.search;
  try {
    const results = await Transaction.find({
      $or:[
        {title:{$regex:search, $options: 'i'}},
        { category: { $regex: search, $options: 'i' } }
      ]
    })

      if (results.length === 0) {
      return res.status(404).json({ message: 'No transactions found.' });
    }

 res.status(200).json({results});
  } catch (error) {
      res.status(500).json({ message: 'Failed to fetch transactions', error: error.message });
  }

}


module.exports = {addTransaction,getTransactions,deleteTransaction,searchTransaction}