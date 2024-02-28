const {createError} = require("../utils/createError")
const Order = require("../models/orderModel")
const Gig = require("../models/gigModel")
const Stripe = require("stripe")

// const secret_key = "sk_test_51OokHrSHioAVIRAYxJs6mk2KbbrCyMGHAwxZdcA9SnPaSEKBMU23vw7vwfppDYUNyumaUvv4qQGBF2mpLplL2tmc00tuxdedE8"
// const publish_key = "pk_test_51OokHrSHioAVIRAYM75TN3KVrLZVEIRF5h44lqARYktr5xAuwIJGE3y0CipcXDqdxakupor9E1xnxtxAQxsM93kD00EwvzYTim"

const intent = async (req, res, next)=>{
    const stripe = new Stripe(process.env.STRIPE)

    const gig = await Gig.findById(req.params.id)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: gig.price * 83,
        currency: "inr",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
      });

    const newOrder = new Order({
        gigId: gig._id,
        img: gig.cover,
        title: gig.title,
        buyerId: req.userId,
        sellerId: gig.userId,
        price: gig.price,
        payment_intent: paymentIntent.id,
    })
    await newOrder.save()

    res.status(200).send({
        clientSecret: paymentIntent.client_secret,
    })

}

const getOrders = async (req, res, next) => {
    try{
        const orders = await Order.find({
            ...(req.isSeller ? {sellerId: req.userId} : {buyerId: req.userId}), 
            isCompleted: true
        })

        res.status(200).send(orders)
    }catch(err){
        next(err)
    }
}

const confirm = async (req,res,next)=>{
    try{    
        const orders = await Order.findOneAndUpdate({payment_intent: req.body.payment_intent},{
            $set:{isCompleted: true}
        }, {new: true})
        res.status(200).send("Order has been confirmed.")
    }catch(err){
        next(err)
    }
}

module.exports = { getOrders, intent, confirm}