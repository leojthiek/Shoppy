import asyncHandler from "express-async-handler"
import Cart from "../models/cartModels.js"

const addToCart = asyncHandler(async (req, res) => {
  const { user, product, qty, price, countInStock, image, name } = req.body

  if (!product) {
    res.status(400)
    throw new Error("no items in cart")
  } else {
    const item = new Cart({
      user,
      product,
     image,
      qty,
      price,
      countInStock,
      name,
    })
    const createdItem = await item.save()
    const updatedItem = await createdItem.populate("product")
    res.status(201).json(updatedItem)
  }
})

const getCartItems = asyncHandler(async (req, res) => {
  const userId = req.params.userId
  const cartItems = await Cart.find({ user: userId }).populate("product")
  if (!cartItems) {
    res.status(404)
    throw new Error("No cart items found for user")
  }

  res.status(200).json(cartItems)
})

// @desc    Delete a product from a user's cart
// @route   DELETE /api/cart/:userId
// @access  Private
const deleteCartItem = asyncHandler(async (req, res) => {
  const userId = req.params.userId
  const productId = req.query.product

  await Cart.deleteOne({ user: userId, product: productId })
  res.json("deleted")
})

export { addToCart, getCartItems, deleteCartItem }
