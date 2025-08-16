const router = require('express').Router()
const {registerUser,loginUser,logOut} = require('../controllers/userController') 
const protect = require('../middleware/protect')

router.post('/auth/signup',registerUser)
router.post('/auth/login',loginUser)
router.post('/auth/logout',logOut)
router.get('/profile',protect,(req,res)=>{
    res.json({success: true, user: req.user})
})




module.exports  = router  