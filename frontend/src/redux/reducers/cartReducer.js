import * as constant from "../constant/cartConstant"

export const cartReducer = (state = { cartItems: [] , shippingAddress:{}}, action) => {
  switch (action.type) {
    case constant.CART_ADD_ITEM:
      const items = action.payload

      const existsItem = state.cartItems.find(
        (x) => x.product === items.product
      )

      if (existsItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existsItem.product ? items : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, items],
        }
      }
      case constant.CART_REMOVE_ITEM:
        return{
          ...state,
          cartItems: state.cartItems.filter((x)=> x.product !== action.payload)
        }
        case constant.CART_GET_ITEM:
          return{
            ...state,
            cartItems:action.payload
          }
        case constant.CART_SAVE_SHIPPING_ADDRESS:
          return{
            ...state,
            shippingAddress: action.payload
          }
          case constant.CART_SAVE_PAYMENT_METHOD:
            return{
              ...state,
              paymentMethod: action.payload
            }
      default:
        return state
  }
}


