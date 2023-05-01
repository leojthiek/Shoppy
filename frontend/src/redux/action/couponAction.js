import * as constant from '../constant/couponConstant'
import axios from 'axios'
  
  export const addCouponAction = (couponData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constant.ADD_COUPON_REQUEST,
      })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.post(`/api/coupon`, couponData, config)
  
      dispatch({
        type: constant.ADD_COUPON_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: constant.ADD_COUPON_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const getAllCoupons = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: constant.GETALL_COUPON_REQUEST,
      })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(`/api/coupon`, config)
  
      dispatch({
        type: constant.GETALL_COUPON_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: constant.GETALL_COUPON_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const deleteCouponAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constant.DELETE_COUPON_REQUEST,
      })
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      await axios.delete(`/api/${id}`, config)
  
      dispatch({
        type: constant.DELETE_COUPON_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: constant.DELETE_COUPON_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const getCouponAction = (id) => async (dispatch,getState) => {
    try {
      dispatch({ type: constant.GET_COUPON_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/coupon/${id}`,config)
      dispatch({
        type: constant.GET_COUPON_SUCCESS,
        payload: data,
      })
      console.log(data)
    } catch (error) {
      dispatch({
        type: constant.GET_COUPON_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const applyCouponAction = (name) => async (dispatch,getState) => {
    try {
      dispatch({ type: constant.APPLY_COUPON_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.put(`/api/coupon`,{name,user:userInfo._id || userInfo.id},config)
      dispatch({
        type: constant.APPLY_COUPON_SUCCESS,
        payload: data,
      })
      console.log(data)
    } catch (error) {
      dispatch({
        type: constant.APPLY_COUPON_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  