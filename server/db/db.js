const mongoose = require('mongoose');
require('dotenv').config();

const url  = process.env.MONGODB_URI

const connectDB = async()=>{
    try {
        mongoose.connection.on('connected',()=>console.log('Database Connected'))
        
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    } catch (error) {
         console.error('❌ Initial connection error:', error.message);
    }

}

module.exports = connectDB