import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"

const getProduct = asyncHandler(async (req, res) => {
  const keyword=req.query.keyword ? {
    name:{
      $regex:req.query.keyword,
      $options:'i'
    }
  }:{}

  const products = await Product.find({...keyword})
  res.json(products)
})
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error("product not found")
  }
})

//@route  DELETE products/:id
//@access  PRIVATE/ADMIN
//@desc   DELETE products

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await Product.findByIdAndRemove(req.params.id)
    res.json({ message: "Products remove" })
  } else {
    res.status(404)
    throw new Error("product not found")
  }
})

//@route   /products
//@access  PRIVATE/ADMIN
//@desc   create a products

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    description: "sample description",
    countInStock: 0,
    numReviews: 0,
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, countInStock, brand, category } =
    req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.countInStock = countInStock
    product.brand = brand
    product.category = category

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error("product not found")
  }
})

const createProductReviews = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviews = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviews) {
      res.status(400)
      throw new Error("product can only reviews once")
    }
   
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: "reviews added" })
  } else {
    res.status(404)
    throw new Error("product not found")
  }
})
export {
  getProduct,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReviews,
}
