import * as constant from '../constant/razorpayConstant'

export const razorpayBalanceReducer = (state = {balance:{}}, action) => {
    switch (action.type) {
      case constant.RAZORPAY_BALANCE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case constant.RAZORPAY_BALANCE_SUCCESS:
        return {
          ...state,
          balance: action.payload,
          loading: false,
        };
      case constant.RAZORPAY_BALANCE_FAILURE:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  };

  export const razorpayBalanceCountReducer = (state = {balanceCount:{}}, action) => {
    switch (action.type) {
      case constant.RAZORPAY_BALANCE_COUNT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case constant.RAZORPAY_BALANCE_COUNT_SUCCESS:
        return {
          ...state,
          balanceCount: action.payload,
          loading: false,
        };
      case constant.RAZORPAY_BALANCE_COUNT_FAILURE:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  };


  export const razorpayMonthlyEarningReducer = (state = {monthlyAmount:{}}, action) => {
    switch (action.type) {
      case constant.RAZORPAY_MONTHLY_EARNING_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case constant.RAZORPAY_MONTHLY_EARNING_SUCCESS:
        return {
          ...state,
          monthlyAmount: action.payload,
          loading: false,
        };
      case constant.RAZORPAY_MONTHLY_EARNING_FAILURE:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  };