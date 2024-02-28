const express = require("express")
const { getOrders, intent, confirm } = require("../controllers/orderController")
const { verifyToken } = require("../middleware/jwt")

const router = express.Router()

// router.post("/:gigId", verifyToken, createOrder)
router.get("/", verifyToken, getOrders)
router.post("/create-payment-intent/:id", verifyToken, intent)
router.put("/", verifyToken, confirm)

module.exports = router