import asyncHandler from "express-async-handler"
import Offer from "../models/offerModels.js"
import Product from "../models/productModel.js"
import { response } from "express"

// @desc    creating an offer
// @routes   POST /api/offer
// @access    private/admin

const createOffer = asyncHandler(async (req, res) => {
  const { title, category, discountPercentage, startDate, endDate } = req.body

  const existingOffer = await Offer.findOne({ category })
  if (existingOffer && existingOffer.endDate > new Date()) {
    return res
      .status(400)
      .json({ message: "An active offer currently existed for this category" })
  }
    const offer = new Offer({
      title,
      category,
      discountPercentage,
      startDate,
      endDate,
    })

    const newOffer = await offer.save()

    if (offer.category === "all") {
        const products = await Product.find({})
        products.forEach(async (product) => {
          const newPrice =
            product.price - (product.price * discountPercentage) / 100
          product.offerPrice = newPrice
          await product.save()
        })
      } else {
        const products = await Product.find({ category: offer.category })
        products.forEach(async (product) => {
          const newPrice =
            product.price - (product.price * discountPercentage) / 100
          product.offerPrice = newPrice
          await product.save()
        })
        
      }
      const interval = setInterval(async () => {
        if (new Date() > offer.endDate) {
          clearInterval(interval)
          if (offer.category === "all") {
            const products = await Product.find({})
            products.forEach(async (product) => {
              product.offerPrice = null
              await product.save()
            })
          } else {
            const products = await Product.find({ category: offer.category })
            products.forEach(async (product) => {
              product.offerPrice = null
              await product.save()
            })
          }
        }
      },5000) // check every 5sec if the offer has ended
    res.status(200).json(newOffer)
  
})

// @desc    update an offer
// @routes   PUT /api/offer/:orderId
// @access    private/admin

const updateOffer = asyncHandler(async(req,res)=>{
    const id= req.params.id

    const existingOffer = await Offer.findById(id)
    if(!existingOffer){
        return res.status(400).json({message:'offer not found'})
    }
     
    const {title,category,discountPercentage,startDate,endDate}=req.body

    existingOffer.title = title
    existingOffer.category = category
    existingOffer.discountPercentage = discountPercentage
    existingOffer.startDate = startDate
    existingOffer.endDate = endDate

    const updatedOffer = await existingOffer.save()


    if (updatedOffer.category === "all") {
        const products = await Product.find({})
        products.forEach(async (product) => {
          const newPrice =
            product.price - (product.price * discountPercentage) / 100
          product.offerPrice = newPrice
          await product.save()
        })
      } else {
        const products = await Product.find({ category: updatedOffer.category })
        products.forEach(async (product) => {
          const newPrice =
            product.price - (product.price * discountPercentage) / 100
          product.offerPrice = newPrice
          await product.save()
        })
        
      }
      const interval = setInterval(async () => {
        if (new Date() > updatedOffer.endDate) {
          clearInterval(interval)
          if (updatedOffer.category === "all") {
            const products = await Product.find({})
            products.forEach(async (product) => {
              product.offerPrice = null
              await product.save()
            })
          } else {
            const products = await Product.find({ category: updatedOffer.category })
            products.forEach(async (product) => {
              product.offerPrice = null
              await product.save()
            })
          }
        }
      },5000) // check every 5sec if the offer has ended
      res.status(200).json(updatedOffer)
})

// @desc    get all offer
// @routes   GET /api/offer
// @access    private/admin


const getAllOffer=asyncHandler(async(req,res)=>{
    const offer = await Offer.find({})
    res.status(200).json(offer)
})

// @desc    delete an offer
// @routes   DELETE /api/offer/:orderId
// @access    private/admin

const deleteOffer = asyncHandler(async(req,res)=>{
    const offerId = req.params.id

    const offer = await Offer.deleteOne({_id : offerId})
    if(!offer){
        res.status(400).json({message:'offer not found'})
    }

    const query = offer.category === "all"
        ? {}
        : { category: offer.category }
    await Product.updateMany(query, { $unset: { offerPrice: "" } })

  
    res.status(200).json({message:'offer deleted successfully'})
})

// @desc    get single offer details
// @routes   GET /api/offer/:orderId
// @access    private/admin

const getOneOffer = asyncHandler(async(req,res)=>{
    const {id} = req.params
    
    const offer = await Offer.findById({_id:id})

    if(offer){
        res.status(200).json(offer)
    }else{
        response.status(400).json({message:'offer data not found'})
    }

})


export { createOffer,updateOffer ,getAllOffer,deleteOffer,getOneOffer}
