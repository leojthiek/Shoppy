import express from 'express'
import { addToCart ,getCartItems, deleteCartItem} from '../controller/cartController.js'
import {protect} from '../middleware/authMiddleware.js'

const router=express.Router()

router.route('/').post(protect,addToCart)
router.route('/:userId?').get(protect,getCartItems).delete(protect,deleteCartItem)

export default router