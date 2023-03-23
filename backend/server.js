import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import productRoute from "./routes/productRoutes.js"
import { notFound ,errorHandler} from "./middleware/errorMiddleware.js"

dotenv.config()
connectDB()

const app = express()

app.get("/", (req, res) => {
  res.send("api called")
})
app.use("/api/products", productRoute)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT
const NODE_ENV=process.env.NODE_ENV
app.listen(PORT, console.log(`server running in ${NODE_ENV} on port ${PORT}`))
