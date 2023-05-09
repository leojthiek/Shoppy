import * as constant from "../constant/orderConstant"
import axios from "axios"

export const orderCreateAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constant.ORDER_CREATE_REQUEST,
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
    const { data } = await axios.post(`/orders`, order, config)

    dispatch({
      type: constant.ORDER_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: constant.ORDER_CREATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const orderDetailsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constant.ORDER_DETAILS_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/orders/${id}`, config)

    dispatch({
      type: constant.ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: constant.ORDER_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const orderToPayAction = (orderId,paymentId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constant.ORDER_PAY_REQUEST,
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

    //{}: This is an empty object that represents the request body.
    //In this case, the PUT request doesn't require any data to be sent in the request body.
    const { data } = await axios.put(
      `/orders/razorpay/success/${orderId}`,
      {paymentId},
      config
    )

    dispatch({
      type: constant.ORDER_PAY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: constant.ORDER_PAY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listMyOrderAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: constant.MYORDER_LIST_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/orders/myorders`, config)

    dispatch({
      type: constant.MYORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: constant.MYORDER_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const allOrderListAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: constant.ALL_ORDER_LIST_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/orders`, config)

    dispatch({
      type: constant.ALL_ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: constant.ALL_ORDER_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const orderDeliverAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constant.ORDER_DELIVER_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(`/orders/${order._id}/deliver`, {}, config)

    dispatch({
      type: constant.ORDER_DELIVER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: constant.ORDER_DELIVER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const countOrderAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: constant.ORDER_COUNT_REQUEST,
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
    const { data } = await axios.get(`/orders/order/count`, config)

    dispatch({ type: constant.ORDER_COUNT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constant.ORDER_COUNT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
