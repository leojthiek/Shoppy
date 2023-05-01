import asyncHandler from "express-async-handler"
import Coupon from "../models/couponModels.js"

// @desc  Add a new Coupon
// @route POST  /api/coupon
// @access PRIVATE/ADMIN

const addCoupon = asyncHandler(async (req, res) => {
  const { name, product, discountAmount, discountType, expirationDate } =
    req.body

  const existingName = await Coupon.findOne({ name: req.body.name })
  if (existingName) {
    return res.status(402).json({ message: "coupon name already existed" })
  }
  const coupon = new Coupon({
    name,
    product,
    discountAmount,
    discountType,
    expirationDate,
  })

  const newCoupon = await coupon.save()
  res.json(newCoupon)
})


// @desc  coupon place in order to get a discount
// @route  PUT  /api/coupon
// @access PUBLIC

const applyCouponToOrder = asyncHandler(async (req, res) => {
  const { name, user } = req.body
  const coupon = await Coupon.findOne({name})

  if(!coupon  || coupon.name !== name){
    res.status(400)
    throw new Error('coupon not found')
  }
  
  if(coupon.expirationDate < Date.now()){
    return res.status(400).json({message:'coupon has expired'})
  }

  let updatedCoupon
  if (coupon) {
    if (coupon.users.includes(user)) {
      res.status(400).json({ message: "you already used this coupon" })
    } else {
      coupon.users.push(user)
      updatedCoupon = await coupon.save()
      res.json(updatedCoupon)
    }
  } else {
    res.status(400).json({message:"coupon does not exist"})
  }
})



// @desc   delete coupon
// @route  DELETE  /api/:couponId
// @access PRIVATE/ADMIN

const deleteCoupon=asyncHandler(async(req,res)=>{
    const couponId= req.params.couponId

    const coupon = await Coupon.deleteOne({_id:couponId})
    if(coupon){
        res.json('coupon deleted')
    }else{
        res.json('coupon not found')
    }
})


// @desc   get all coupon
// @route  GET  /api/coupon
// @access PRIVATE/ADMIN

const getAllCoupons=asyncHandler(async(req,res)=>{
    const coupons=await Coupon.find({})
    res.json(coupons)
})

// @desc   get single coupon details
// @route  GET  /api/coupon/:couponId
// @access PRIVATE/ADMIN

const getCouponById = asyncHandler(async (req, res) => {
  console.log(req.params.id)
    const coupon = await Coupon.findById(req.params.id)
    if (coupon) {
      res.json(coupon)
    } else {
      res.status(404)
      throw new Error("coupon not found")
    }
  })


export { addCoupon,applyCouponToOrder ,deleteCoupon,getAllCoupons,getCouponById}
