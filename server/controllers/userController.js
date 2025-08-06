const User = require('../models/UserSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser  =async (req,res)=>{
    const {name,email,password} = req.body
    const profilePic = req.file ? req.file.path : undefined;
    try {
        const userExists = await User.findOne({email});
        if(userExists) return res.status(400).json({ msg: "User already exists" });

        const hashedPassword   = await bcrypt.hash(password,10)

        const newUser = new User({
            name,
            email,
            password :hashedPassword,
            profilePic
        })

        await newUser.save()
        res.status(200).json({success:true,message:'User created successfully',user:newUser})
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, msg: 'Server error' });
    }
}

const loginUser = async (req,res)=>{
    const {email,password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch  =await bcrypt.compare(password,user.password)

        if(!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({id:user._id},process.env.TOKEN_SECRET,{
            expiresIn:"7d"
        })
        res.status(200).json({success:true,message:"User login successfully",token})  
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Server error' });
    }
}


module.exports = {registerUser,loginUser}  