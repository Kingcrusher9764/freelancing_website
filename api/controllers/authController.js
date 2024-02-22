const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const createError = require("../utils/createError")
dotenv.config()

const register = async (req,res, next)=>{

    try{
        const newUser = new User(req.body)
        await newUser.save()
        res.status(201).send("User has been created")
    }catch(err){
        next(err)
    }

}

const login = async (req,res, next)=>{
    try{
        const user = await User.findOne({username: req.body.username})
        if(!user) return next(createError(404, "User not found!"))
        const isCorrect = req.body.password === user.password
        if(!isCorrect) return next(createError(400,"Wrong Password or Username!"))
        
        const token = jwt.sign({
            id: user._id, 
            isSeller: user.isSeller,
        }, process.env.JWT_KEY)
        
        const {password, ...info} = user._doc
        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).send(info)
    }catch(err){
        next(err)
    }
}

const logout = async (req,res)=>{
    res.clearCookie("accessToken", {
        sameSite:"none",
        secure: true,
    }).status(200).send("User has been logged out!")
}
module.exports = {register, login, logout}