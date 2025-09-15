const User = require('../models/UserSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser  =async (req,res)=>{
       const { name, email, password,profilePic} = req.body; 
        
    try {
        const userExists = await User.findOne({email});
        if(userExists) return res.status(400).json({ message: "User already exists" });

        const hashedPassword   = await bcrypt.hash(password,10)

        const newUser = new User({
            name,
            email,
            password :hashedPassword,
            profilePic: profilePic || "https://res.cloudinary.com/dgrxeqayx/image/upload/v1754314800/12225935_ul55vr.png" 
        })

        await newUser.save()
        res.status(200).json({success:true,message:'User created successfully',user:newUser})
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

const loginUser = async (req,res)=>{  
    const {email,password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch  =await bcrypt.compare(password,user.password)

        if(!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({id:user._id,profilePic: user.profilePic},process.env.TOKEN_SECRET,{
            expiresIn:"7d"
        })

        res.cookie("token",token,{
            httpOnly:true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })


        res.status(200).json({
                    success: true,
                    message: "User login successfully",
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        profilePic: user.profilePic
                    }
                });
        } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}


const logOut = async (req,res) =>{
    res.clearCookie('token');
    res.json({ message: 'Logged out' });

}

module.exports = {registerUser,loginUser,logOut}  