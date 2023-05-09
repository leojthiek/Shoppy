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
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
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

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case constant.PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        product: {},
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

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case constant.PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      }
    case constant.PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case constant.PRODUCT_DELETE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const ProductCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case constant.PRODUCT_CREATE_REQUEST:
      return {
        loading: true,
      }
    case constant.PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      }
    case constant.PRODUCT_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
    case constant.PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case constant.PRODUCT_UPDATE_REQUEST:
      return {
        loading: true,
      }
    case constant.PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      }
    case constant.PRODUCT_UPDATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
    case constant.PRODUCT_UPDATE_RESET:
      return {
        product: {},
      }
    default:
      return state
  }
}

export const productReviewsCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case constant.PRODUCT_CREATE_REVIEWS_REQUEST:
      return {
        loading: true,
      }
    case constant.PRODUCT_CREATE_REVIEWS_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case constant.PRODUCT_CREATE_REVIEWS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
    case constant.PRODUCT_CREATE_REVIEWS_RESET:
      return {}

    default:
      return state
  }
}

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case constant.PRODUCT_TOP_REQUEST:
      return {
        loading: true,
        products: [],
      }
    case constant.PRODUCT_TOP_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      }
    case constant.PRODUCT_TOP_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const productCategoryReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case constant.PRODUCT_CATEGORY_REQUEST:
      return {
        loading: true,
        categories: [],
      }
    case constant.PRODUCT_CATEGORY_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      }
    case constant.PRODUCT_CATEGORY_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
