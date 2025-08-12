const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');

const protect  = async (req,res,next) =>{
     const token = req.cookies?.token;  
     
   if (!token) {
        return res.status(401).json({ success: false, msg: "Access denied. No token provided." });
    }

    try {
        const decoded  = jwt.verify(token,process.env.TOKEN_SECRET)
        const user = await User.findById(decoded.id).select("name email profilePic"); 
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }
        req.user = user;
        next()
    } catch (error) {
       console.error("Token verification failed:", error.message);
        return res.status(401).json({ success: false, msg: "Invalid or expired token." });
    }
}

module.exports = protect
