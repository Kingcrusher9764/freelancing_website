const createError = require("../utils/createError")
const Message = require("../models/messageModel")
const Conversation = require("../models/conversationModel")

const createMessage = async (req, res, next) =>{
    const newMessage = new Message({
        conversationId : req.body.conversationId,
        userId: req.userId,
        desc: req.body.desc,
    })

    try{
        const savedMessage = await newMessage.save()
        await Conversation.findOneAndUpdate({id: req.body.conversationId}, {
            $set:{
                readBySeller: req.isSeller,
                readByBuyer: !req.isSeller,
                lastMessage: req.body.desc,
            }
        },{new: true})
        
        res.status(200).send(savedMessage)
    }catch(err){
        next(err)
    }
}
const getMessages = async (req, res, next) =>{
    try{
        const messages = await Message.find({conversationId: req.params.id})
        res.status(200).send(messages)
    }catch(err){
        next(err)
    }
}

module.exports = {createMessage, getMessages}