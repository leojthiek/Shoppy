import express from "express"
import cloudinary from 'cloudinary'
import morgan from "morgan"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import productRoute from "./routes/productRoutes.js"
import UserRoute from "./routes/userRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import OrderRoute from "./routes/orderRoutes.js"



dotenv.config()
connectDB()

const app = express()
app.use(express.json())

if (process.env.NODE_ENV === 'development mode'){
  app.use(morgan('dev'))
}

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})

app.get("/", (req, res) => {
  res.send("api called")
})
app.use("/api/products", productRoute)
app.use("/users", UserRoute)
app.use("/orders", OrderRoute)


app.use(notFound)
app.use(errorHandler)




const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV
app.listen(PORT, console.log(`server running in ${NODE_ENV} on port ${PORT}`))
