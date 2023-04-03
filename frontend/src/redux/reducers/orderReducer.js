import * as constant from "../constant/orderConstant"

export const orderCreateReducers = (state = {}, action) => {
  switch (action.type) {
    case constant.ORDER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case constant.ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      }
    case constant.ORDER_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case constant.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case constant.ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case constant.ORDER_DETAILS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case constant.ORDER_PAY_REQUEST:
      return {
        loading: true,
      }
    case constant.ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success:true
      }
    case constant.ORDER_PAY_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
    case constant.ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const orderListMyReducer = (state ={orders:[]}, action) => {
  switch (action.type) {
    case constant.MYORDER_LIST_REQUEST:
      return {
        loading: true,
      }
    case constant.MYORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders:action.payload
      }
    case constant.MYORDER_LIST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
      case constant.MYORDER_LIST_RESET:
        return {orders:[]}
    default:
      return state
  }
}

export const allOrdersReducer = (state ={orders:[]}, action) => {
  switch (action.type) {
    case constant.ALL_ORDER_LIST_REQUEST:
      return {
        
        loading: true,
      }
    case constant.ALL_ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders:action.payload
      }
    case constant.ALL_ORDER_LIST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}


export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case constant.ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      }
    case constant.ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success:true
      }
    case constant.ORDER_DELIVER_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
    case constant.ORDER_DELIVER_RESET:
      return {}
    default:
      return state
  }
}
