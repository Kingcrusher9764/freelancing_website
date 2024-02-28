const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const createError = require("../utils/createError")

const deleteUser = async (req, res, next)=>{

    const user = await User.findById(req.params.id)
    if(req.userId !== user._id.toString()){
        return next(createError(403,"You can delete only your account!"))
    }
    await User.findByIdAndDelete(req.params.id)
    return next(createError(200,"Account deleted successfully!"))
}

const getUser = async ( req, res, next)=>{
    const user = await User.findById(req.params.id)
    res.status(200).send(user)
}

module.exports = {
    deleteUser, 
    getUser
}