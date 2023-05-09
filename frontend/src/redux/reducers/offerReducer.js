import * as constant from '../constant/offerConstant'

export const createOfferReducer = (state = { offers: {} }, action) => {
    switch (action.type) {
      case constant.CREATE_OFFER_REQUEST:
        return { loading: true };
      case constant.CREATE_OFFER_SUCCESS:
        return { loading: false,success:true, offer: action.payload };
      case constant.CREATE_OFFER_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const offerListReducer = (state = { offers: [] }, action) => {
    switch (action.type) {
      case constant.GET_OFFER_REQUEST:
        return { loading: true, coupons: [] };
      case constant.GET_OFFER_SUCCESS:
        return { loading: false, offers: action.payload };
      case constant.GET_OFFER_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const offerDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case constant.DELETE_OFFER_REQUEST:
        return {
          loading: true,
        }
      case constant.DELETE_OFFER_SUCCESS:
        return {
          loading: false,
          success: true,
        }
      case constant.DELETE_OFFER_FAILURE:
        return {
          loading: false,
          error: action.payload,
        }
      default:
        return state
    }
  }

  export const getOfferReducer = (
    state = { offer:{}},
    action
  ) => {
    switch (action.type) {
      case constant.GET_SINGLE_OFFER_REQUEST:
        return {
          loading: true,
          offer: {},
        }
      case constant.GET_SINGLE_OFFER_SUCCESS:
  
        return {
          loading: false,
          offer: action.payload,
          
        }
      case constant.GET_SINGLE_OFFER_FAILURE:
        return {
          loading: false,
          error: action.payload,
        }
      default:
        return state
    }
  }

  export const offerUpdateReducer = (state = { offer: {} }, action) => {
    switch (action.type) {
      case constant.UPDATE_OFFER_REQUEST:
        return {
          loading: true,
        }
      case constant.UPDATE_OFFER_SUCCESS:
        return {
          loading: false,
          success: true,
          offer: action.payload,
        }
      case constant.UPDATE_OFFER_FAILURE:
        return {
          loading: false,
          error: action.payload,
        }
        case constant.UPDATE_OFFER_RESET:
          return {
            offer: {},
          }
    
      default:
        return state
    }
  }