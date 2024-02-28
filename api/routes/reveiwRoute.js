const express = require("express")
const {createReview, getReviews, deleteReview} = require("../controllers/reviewController")
const {verifyToken} = require("../middleware/jwt")

const router = express.Router()

router.post("/", verifyToken, createReview )
router.get("/:gigId", getReviews)
router.delete("/:gigId", deleteReview)

module.exports = router