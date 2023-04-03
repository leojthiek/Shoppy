import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"
import Razorpay from "razorpay"

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItem,
    shippingAddress,
    paymentMethod,
    itemPrice,
    shippingPrice,
    totalPrice,
    taxPrice,
  } = req.body

  if (orderItem && orderItem.length === 0) {
    res.status(400)
    throw new Error("no order items")
  } else {
    const order = new Order({
      orderItem,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemPrice,
      shippingPrice,
      totalPrice,
      taxPrice,
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  )

  if (order) {
    res.json(order)
  } else {
    res.status(400)
    throw new Error("order not found")
  }
})

const updateOrderToPay = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    ;(order.isPaid = true),
      (order.paidAt = Date.now()),
      (order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      })
    const updatedOrder = await Order.save()
    res.json(updatedOrder)
  } else {
    res.status(400)
    throw new Error("order not found")
  }
})

//  get logged in user order

const getMyOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })

  res.json(orders)
})

//@desc    Get all orders
//Routes   /orders
// access   Private/admin

const getAllOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name")

  res.json(orders)
})

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered=true
    order.paidAt=Date.now()
    
    const updatedOrder = await Order.save()
    res.json(updatedOrder)
  } else {
    res.status(400)
    throw new Error("order not found")
  }
})

export {
  updateOrderToPay,
  getOrderById,
  addOrderItems,
  getMyOrder,
  getAllOrder,
  updateOrderToDelivered,
}
