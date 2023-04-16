import * as constant from "../constant/cartConstant"
import axios from "axios"

export const addCartAction = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  const {
    userLogin: { userInfo },
  } = getState()

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  const cart = {
    user: userInfo._id || userInfo.id,
    product: data._id,
    name: data.name,
    image: data.image,
    price: data.price,
    countInStock: data.countInStock,
    qty,
  }
  const response = await axios.post("/api/cart", cart, config)
  dispatch({
    type: constant.CART_ADD_ITEM,
    payload: response.data,
  })
}

export const getCartItem = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState()

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  const { data } = await axios.get(`/api/cart/${userInfo._id  || userInfo.id}`, config)

  dispatch({
    type: constant.CART_GET_ITEM,
    payload: data,
  })
}

export const cartRemoveAction = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState()

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/cart/${userInfo._id || userInfo.id}?product=${id}`, config)

    dispatch({
      type: constant.CART_REMOVE_ITEM,
      payload: id,
    })
  } catch (error) {
    console.error(error)
  }
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: constant.CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })
  localStorage.getItem("shippingAddress", JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: constant.CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })
  localStorage.getItem("paymentMethod", JSON.stringify(data))
}
