import express from 'express'
import { addOrderItems,getOrderById,updateOrderToPay,getMyOrder,getAllOrder,updateOrderToDelivered
} from '../controller/orderController.js'
import {protect,admin} from '../middleware/authMiddleware.js'


const router=express.Router()

router.route('/').post(protect,addOrderItems).get(protect,admin,getAllOrder)
router.route('/myorders').get(protect, getMyOrder)
router.route('/:id').get(protect,getOrderById)
router.route('/razorpay/success/:id').put(protect,updateOrderToPay)
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered)







 export default router;