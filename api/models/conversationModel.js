const mongoose = require("mongoose")

const conversationSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    sellerId:{
        type: String,
        required: true,
    },
    buyerId:{
        type: String,
        required: true,
    },
    readBySeller:{
        type: Boolean,
        default: false
    },
    readByBuyer:{
        type: Boolean,
        default: false
    },
    lastMessage:{
        type: String,
        required: false,
    },
},{
    timestamps:true,
})

module.exports = mongoose.model("Conversation", conversationSchema)