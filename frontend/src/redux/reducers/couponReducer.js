import * as constant from '../constant/couponConstant'
  
  export const addCouponReducer = (state = { coupon: {} }, action) => {
    switch (action.type) {
      case constant.ADD_COUPON_REQUEST:
        return { loading: true };
      case constant.ADD_COUPON_SUCCESS:
        return { loading: false, success: true, coupon: action.payload };
      case constant.ADD_COUPON_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };


export const couponListReducer = (state = { coupons: [] }, action) => {
  switch (action.type) {
    case constant.GETALL_COUPON_REQUEST:
      return { loading: true, coupons: [] };
    case constant.GETALL_COUPON_SUCCESS:
      return { loading: false, coupons: action.payload };
    case constant.GETALL_COUPON_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const couponDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case constant.DELETE_COUPON_REQUEST:
      return {
        loading: true,
      }
    case constant.DELETE_COUPON_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case constant.DELETE_COUPON_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const getCouponReducer = (
  state = { coupon:{}},
  action
) => {
  switch (action.type) {
    case constant.GET_COUPON_REQUEST:
      return {
        loading: true,
        coupon: {},
      }
    case constant.GET_COUPON_SUCCESS:

      return {
        loading: false,
        coupon: action.payload,
        
      }
    case constant.GET_COUPON_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const applyCouponReducer = (state = {}, action) => {
  switch (action.type) {
    case constant.APPLY_COUPON_REQUEST:
      return { loading: true }
    case constant.APPLY_COUPON_SUCCESS:
      return { loading: false, coupon: action.payload }
    case constant.APPLY_COUPON_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
