const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = "qwertyuiopasdfghjklzxcvbnmqwerty"


router.post("/signup",[body('email').isEmail(),body('name').isLength({min:5}),body('password','Incorrect Password').isLength({min:5})],async(req,res)=>{
    console.log(req.body)
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const salt = await bcrypt.genSalt(10)
    const secPassword = await bcrypt.hash(req.body.password,salt)
    try {
        await User.create({
            name: req.body.name,
            //password: req.body.password,
            password:secPassword,
            email: req.body.email,
            location: req.body.location
        })
        res.json({success:true})

    } catch (error) {
        console.log(error)
    }
})

router.post("/login",[body('email').isEmail(),body('password','Incorrect Password').isLength({min:5})],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const email = req.body.email
    const pwd   = req.body.password
    try {
        const userData = await User.findOne({email});
        if(!userData){
            return res.status(400).json({errors:"Try logging with correct email"})
        }
        const pwdCompare = await bcrypt.compare(pwd,userData.password)
        if(!pwdCompare){
            return res.status(400).json({errors:"Try logging with correct password"})
        }
        const data = {
            user:{
                id:userData.id
            }
        }
        const authToken = jwt.sign(data,jwtSecret)
        return res.json({success:true,authToken:authToken})
    } 
    catch (error) {
        console.log(error)
    }
})

module.exports = router