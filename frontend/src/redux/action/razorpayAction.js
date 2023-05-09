import axios from "axios"
import * as constant from '../constant/razorpayConstant'

export const getBalance = () => async (dispatch, getState) => {
      try {
        dispatch({
          type: constant.RAZORPAY_BALANCE_REQUEST,
        })
        const {
          userLogin: { userInfo },
        } = getState()
    
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
        const { data } = await axios.get(`/api/razorpay/balance`, config)
    
        dispatch({
          type: constant.RAZORPAY_BALANCE_SUCCESS,
          payload: data,
        })
      } catch (error) {
        dispatch({
          type: constant.RAZORPAY_BALANCE_FAILURE,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      }
    }


    export const getBalanceCountAction = () => async (dispatch, getState) => {
      try {
        dispatch({
          type: constant.RAZORPAY_BALANCE_COUNT_REQUEST,
        })
        const {
          userLogin: { userInfo },
        } = getState()
    
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
        const { data } = await axios.get(`/api/razorpay/balancecount`, config)
    
        dispatch({
          type: constant.RAZORPAY_BALANCE_COUNT_SUCCESS,
          payload: data,
        })
      } catch (error) {
        dispatch({
          type: constant.RAZORPAY_BALANCE_COUNT_FAILURE,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      }
    }
    

    export const getMonthlyEarning = () => async (dispatch, getState) => {
      try {
        dispatch({
          type: constant.RAZORPAY_MONTHLY_EARNING_REQUEST,
        })
        const {
          userLogin: { userInfo },
        } = getState()
    
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
        const { data } = await axios.get(`/api/razorpay/monthly/earning`, config)
    
        dispatch({
          type: constant.RAZORPAY_MONTHLY_EARNING_SUCCESS,
          payload: data,
        })
      } catch (error) {
        dispatch({
          type: constant.RAZORPAY_MONTHLY_EARNING_SUCCESS,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      }
    }
    