const express = require("express")
const mongoose = require("mongoose")
const userRoute = require("./routes/userRoute")
const converstaionRoute = require("./routes/conversationRoute")
const gigRoute = require("./routes/gigRoute")
const messageRoute = require("./routes/messageRoute")
const orderRoute = require("./routes/orderRoute")
const reviewRoute = require("./routes/reveiwRoute")
const authRoute = require("./routes/authRoute")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
dotenv.config()

mongoose.set("strictQuery", true)
mongoose.connect("mongodb+srv://Kingcrusher:Kingcrusher@cluster0.kgkmnhs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbname=fiverr")
.then(()=>{console.log("Connected to MongoDB")})
.catch((err)=>{console.log(err.message)})

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/users", userRoute)
app.use("/api/gigs", gigRoute)
app.use("/api/orders", orderRoute)
app.use("/api/conversations", converstaionRoute)
app.use("/api/message", messageRoute)
app.use("/api/reviews", reviewRoute)
app.use("/api/auth", authRoute)

app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).send(errorMessage)
})

app.listen(8800, ()=>{
    console.log(`Backend server is running`)
})