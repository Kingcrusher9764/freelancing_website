const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    img:{
        type: String,
        required: false,
    },
    country:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: false,
    },
    desc:{
        type: String,
        required: false,
    },
    isSeller:{
        type: Boolean,
        default: false,
    },
},{
    timestamps:true,
})

module.exports = mongoose.model("User", userSchema)