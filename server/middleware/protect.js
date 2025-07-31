const jwt = require('jsonwebtoken')

const protect  = (req,res,next) =>{
    const token = req.header("Authorization")?.split(" ")[1]
    if(!token) return res.status(400).json({ msg: "No token provided" });

    try {
        const decoded  = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user = decoded.id
        next()
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Server error' });
    }
}