import express from "express"
import cloudinary from "cloudinary"
import shortid from "shortid"
import Razorpay from "razorpay"
import morgan from "morgan"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import productRoute from "./routes/productRoutes.js"
import UserRoute from "./routes/userRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import OrderRoute from "./routes/orderRoutes.js"
import Order from "./models/orderModel.js"

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

if (process.env.NODE_ENV === "development mode") {
  app.use(morgan("dev"))
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const razorpay=new Razorpay({
  key_id:process.env.RAZORPAY_KEY,
  key_secret:process.env.RAZORPAY_KEY_SECRET
  
})


app.post('/razorpay/pay/:id',async(req,res)=>{
  const order=await Order.findById(req.params.id)
  const payment_capture=1
  const amount=200
  const currency='INR'

  const options={
    amount:order.totalPrice * 100,
    currency,
    receipt:shortid.generate(),
    payment_capture,
  }
  try {
    const response=await razorpay.orders.create(options)
    console.log(response)
    res.json({
      id:response.id,
      currency:response.currency,
      amount:response.amount,
    })
  } catch (error) {
    console.log(error)
  }
})



app.get("/", (req, res) => {
  res.send("api called")
})
app.use("/api/products", productRoute)
app.use("/users", UserRoute)
app.use("/orders", OrderRoute)

app.use(`api/config/paypal`, (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV
app.listen(PORT, console.log(`server running in ${NODE_ENV} on port ${PORT}`))
