const express = require("express")
const {deleteUser, getUser} = require("../controllers/userController")
const {verifyToken} = require("../middleware/jwt")

const router = express.Router()

router.delete("/:id", verifyToken, deleteUser)
router.get("/:id", verifyToken, getUser)

module.exports = router