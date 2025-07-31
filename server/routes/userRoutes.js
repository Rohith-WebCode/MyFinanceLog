const express = require('express');
const router = require('express').Router()
const {registerUser,loginUser} = require('../controllers/userController') 



router.post('/auth/signup',registerUser)
router.post('/auth/login',loginUser)



module.exports  = router