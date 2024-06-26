const express = require("express")
const mongoose = require("mongoose")
const userRoute = require("./routes/userRoute")
const converstaionRoute = require("./routes/conversationRoute")
const gigRoute = require("./routes/gigRoute")
const messageRoute = require("./routes/messageRoute")
const orderRoute = require("./routes/orderRoute")
const reviewRoute = require("./routes/reveiwRoute")
const authRoute = require("./routes/authRoute")
const otp_mailer = require("./routes/otp_mailer")
const mailer = require("./routes/mailer")

const cookieParser = require("cookie-parser")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()

mongoose.set("strictQuery", true)
mongoose.connect(process.env.MongoURL)
    .then(() => { console.log("Connected to MongoDB") })
    .catch((err) => { console.log(err.message) })

const app = express()

app.use(cors({ origin: `${process.env.ORIGIN}`, credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.use("/api/users", userRoute)
app.use("/api/gigs", gigRoute)
app.use("/api/orders", orderRoute)
app.use("/api/conversations", converstaionRoute)
app.use("/api/messages", messageRoute)
app.use("/api/reviews", reviewRoute)
app.use("/api/auth", authRoute)
app.use("/api/otp", otp_mailer)
app.use("/api/sendmail", mailer)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).send(errorMessage)
})

app.listen(process.env.PORT, () => {
    console.log(`Backend server is running`)
})
