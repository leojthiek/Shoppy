import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "@redux-devtools/extension"
import {
  productListReducer,
  productDetailsReducer,
  deleteProductReducer,
  ProductCreateReducer,
  productUpdateReducer,
  productReviewsCreateReducer,
  productTopRatedReducer,
  productCategoryReducer,
} from "./reducers/productReducer"
import { cartReducer } from "./reducers/cartReducer"
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userProfileUpdateReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userCountReducer,
} from "./reducers/userReducer"

import {
  orderCreateReducers,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  allOrdersReducer,
  orderDeliverReducer,
  orderCountReducer,
} from "./reducers/orderReducer"

import {
  addCouponReducer,
  couponListReducer,
  couponDeleteReducer,
  getCouponReducer,
  applyCouponReducer,
} from "./reducers/couponReducer"

import { createOfferReducer, getOfferReducer, offerDeleteReducer, offerListReducer, offerUpdateReducer } from "./reducers/offerReducer"
import { razorpayBalanceCountReducer, razorpayBalanceReducer, razorpayMonthlyEarningReducer } from "./reducers/razorpayReducer"

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null

const shippingAddressStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {}

const initialState = {
  cart: {
    cartItems: [],
    shippingAddress: shippingAddressStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: deleteProductReducer,
  productCreate: ProductCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewsCreate: productReviewsCreateReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userProfileUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userEdit: userUpdateReducer,
  orderCreate: orderCreateReducers,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  allOrders: allOrdersReducer,
  orderDeliver: orderDeliverReducer,
  addCoupon: addCouponReducer,
  couponList: couponListReducer,
  couponDelete: couponDeleteReducer,
  getCoupon: getCouponReducer,
  applyCoupon: applyCouponReducer,
  createOffer:createOfferReducer,
  offerList:offerListReducer,
  offerDelete:offerDeleteReducer,
  getOffer:getOfferReducer,
  offerUpdate:offerUpdateReducer,
  razorpayBalance:razorpayBalanceReducer,
  userCount:userCountReducer,
  orderCount:orderCountReducer,
  razorpayBalanceCount:razorpayBalanceCountReducer,
  razorpayMonthlyEarning:razorpayMonthlyEarningReducer,
  productCategory:productCategoryReducer,
})
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
