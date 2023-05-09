import express from 'express'
import { createOffer, deleteOffer, getAllOffer, getOneOffer, updateOffer } from '../controller/offerController.js'
import {protect,admin} from '../middleware/authMiddleware.js'



const router=express.Router()


router.route('/offer').post(protect,admin,createOffer).get(protect,admin,getAllOffer)
router.route('/offer/:id').put(protect,admin,updateOffer).get(protect,admin,getOneOffer).delete(protect,admin,deleteOffer)


export default router