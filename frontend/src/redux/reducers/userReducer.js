import * as constant from "../constant/userConstant"

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case constant.USER_LOGIN_REQUEST:
      return {
        loading: true,
      }
    case constant.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      }
    case constant.USER_LOGIN_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
      case constant.USER_LOGOUT:
        return{
          userInfo:action.payload
        }
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case constant.USER_REGISTER_REQUEST:
      return {
        loading: true,
      }
    case constant.USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      }
    case constant.USER_REGISTER_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
   
    default:
      return state
  }
}
export const userDetailsReducer = (state = {user:{}}, action) => {
  switch (action.type) {
    case constant.USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case constant.USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      }
    case constant.USER_DETAILS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
     
   
    default:
      return state
  }
}

export const userProfileUpdateReducer = (state ={}, action) => {
  switch (action.type) {
    case constant.USER_UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
      }
    case constant.USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success:true,
        userInfo: action.payload,
      }
    case constant.USER_UPDATE_PROFILE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
   
    default:
      return state
  }
}
