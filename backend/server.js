import express from "express"
import dotenv from 'dotenv'
import products from "./data/products.js"
import connectDB from "./config/db.js"

dotenv.config()
connectDB()

const app = express()

app.get("/", (req, res) => {
  res.send("api called")
})
app.get("/api/products", (req, res) => {
  res.send(products)
})
app.get("/api/products/:id", (req, res) => {
  const product = products.find((item) => item._id === req.params.id)
  res.json(product)
})


const PORT=process.env.PORT
app.listen(PORT, console.log(`server running on port ${PORT}`))
