const jwt = require('jsonwebtoken')

const protect  = (req,res,next) =>{
    const authHeader = req.header("Authorization");

    // Check for Bearer token format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, msg: "Access denied. No token provided." });
    }

     const token = authHeader.split(" ")[1];

    try {
        const decoded  = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user = decoded.id
        next()
    } catch (error) {
       console.error("Token verification failed:", error.message);
        return res.status(401).json({ success: false, msg: "Invalid or expired token." });
    }
}

module.exports = protect
