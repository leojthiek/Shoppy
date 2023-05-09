import express from "express"
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
 countUsersToday,
} from "../controller/userController.js"
import { protect, admin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/").post(registerUser).get(protect, admin, getUsers)
router.route('/login').post(authUser)
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .put(protect,admin, updateUser)
  .get(protect,admin, getUserById)

router.route('/user/count').get(protect,admin,countUsersToday)

export default router
