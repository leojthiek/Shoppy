import express from "express"
import { getProduct, getProductById,deleteProduct,createProduct,updateProduct,createProductReviews, getTopProducts, getCategory} from "../controller/productController.js"
import {protect,admin} from '../middleware/authMiddleware.js'


const router = express.Router()

router.route("/").get(getProduct).post(protect,admin,createProduct)

router.route("/:id").get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)
router.route('/:id/reviews').post(protect,createProductReviews)
router.get('/rated/top',getTopProducts)
router.route('/product/category').get(protect,admin,getCategory)

export default router
