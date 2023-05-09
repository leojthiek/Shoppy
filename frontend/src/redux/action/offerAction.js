import axios from 'axios'
import * as constant from '../constant/offerConstant'


export const createOfferAction = (offerData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constant.CREATE_OFFER_REQUEST,
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
      const { data } = await axios.post(`/api/offer`, offerData, config)
  
      dispatch({
        type: constant.CREATE_OFFER_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: constant.CREATE_OFFER_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const updateOfferAction = (offerData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constant.UPDATE_OFFER_REQUEST,
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
      const { data } = await axios.put(`/api/offer/${offerData.id}`, offerData, config)

     
  
      dispatch({
        type: constant.UPDATE_OFFER_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: constant.UPDATE_OFFER_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const deleteOfferAction = (offerId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constant.DELETE_OFFER_REQUEST,
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
      const { data } = await axios.delete(`/api/offer/${offerId}`, config)
  
      dispatch({
        type: constant.DELETE_OFFER_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: constant.DELETE_OFFER_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


  export const getSingleOffer = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constant.GET_SINGLE_OFFER_REQUEST,
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
      const { data } = await axios.get(`/api/offer/${id}`, config)
  
      dispatch({
        type: constant.GET_SINGLE_OFFER_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: constant.GET_SINGLE_OFFER_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


  export const getAllOffer = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: constant.GET_OFFER_REQUEST,
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
      const { data } = await axios.get(`/api/offer`, config)
  
      dispatch({
        type: constant.GET_OFFER_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: constant.GET_OFFER_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }