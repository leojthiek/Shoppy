import express from 'express'
import {addCoupon, applyCouponToOrder, deleteCoupon, getAllCoupons, getCouponById} from '../controller/couponController.js'
import {protect,admin} from '../middleware/authMiddleware.js'

const router = express.Router()


router.route('/coupon').post(protect,admin,addCoupon).put( protect,applyCouponToOrder).get(protect,admin,getAllCoupons)
router.route('/:couponId').delete(protect,admin,deleteCoupon)
router.route('/coupon/:id').get(protect,admin,getCouponById)


export default router