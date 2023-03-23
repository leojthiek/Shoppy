import * as constant from "../constant/productListConstant"

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case constant.PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: [],
      }
    case constant.PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      }
    case constant.PRODUCT_LIST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const productDetailsReducer = (state = { product:{reviews:[]}}, action) => {
  switch (action.type) {
    case constant.PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        product:{},
      }
    case constant.PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      }
    case constant.PRODUCT_DETAILS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

