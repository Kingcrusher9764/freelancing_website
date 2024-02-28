const express = require("express")
const {createOrder, getOrders} = require("../controllers/orderController")
const { verifyToken } = require("../middleware/jwt")

const router = express.Router()

router.post("/:gigId", verifyToken, createOrder)
router.get("/", verifyToken, getOrders)
// router.post("/", verifyToken, createOrder)

module.exports = router