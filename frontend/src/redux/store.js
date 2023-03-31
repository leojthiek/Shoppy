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
} from "./reducers/productReducer"
import { cartReducer } from "./reducers/cartReducer"
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userProfileUpdateReducer,
  userListReducer,
  userDeleteReducer,
} from "./reducers/userReducer"

import { orderCreateReducers , orderDetailsReducer,orderPayReducer,orderListMyReducer} from "./reducers/orderReducer"

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : []

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null

const shippingAddressStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userProfileUpdateReducer,
  userList:userListReducer,
  userDelete:userDeleteReducer,
  orderCreate:orderCreateReducers,
  orderDetails:orderDetailsReducer,
  orderPay:orderPayReducer,
  orderListMy:orderListMyReducer,
})
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
