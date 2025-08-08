const router = require('express').Router()
const {registerUser,loginUser} = require('../controllers/userController') 
const upload = require('../middleware/multer')

router.post('/auth/signup',upload.single("profilePic"),registerUser)
router.post('/auth/login',loginUser)




module.exports  = router  