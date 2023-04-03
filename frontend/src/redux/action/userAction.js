import * as constant from "../constant/userConstant"
import { MYORDER_LIST_RESET } from "../constant/orderConstant"
import axios from "axios"

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: constant.USER_LOGIN_REQUEST,
    })
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.post("/users/login", {
      email,
      password,
      config,
    })
    dispatch({
      type: constant.USER_LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: constant.USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo")
  dispatch({
    type: constant.USER_LOGOUT,
  })
  dispatch({
    type: MYORDER_LIST_RESET,
  })
  dispatch({
    type: constant.USER_DETAILS_RESET,
  })
  dispatch({ type: constant.USER_LIST_RESET })
}

export const registerAction = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: constant.USER_REGISTER_REQUEST,
    })
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.post("/users", {
      name,
      email,
      password,
      config,
    })

    dispatch({
      type: constant.USER_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: constant.USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: constant.USER_REGISTER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const userDetailsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constant.USER_DETAILS_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        //  "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/users/${id}`, config)

    dispatch({
      type: constant.USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: constant.USER_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUserProfileAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constant.USER_UPDATE_PROFILE_REQUEST,
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
    const { data } = await axios.put(`/users/profile`, user, config)

    dispatch({
      type: constant.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: constant.USER_UPDATE_PROFILE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const userListAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: constant.USER_LIST_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/users`, config)

    dispatch({
      type: constant.USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: constant.USER_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const userDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constant.USER_DELETE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
   await axios.delete(`/users/${id}`, config)

    dispatch({
      type: constant.USER_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: constant.USER_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const userUpdateAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constant.USER_EDIT_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type':'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  const {data}= await axios.put(`/users/${user._id}`,user, config)

    dispatch({
      type: constant.USER_EDIT_SUCCESS,
    })
    dispatch({type:constant.USER_DETAILS_SUCCESS,payload:data})
  } catch (error) {
    dispatch({
      type: constant.USER_EDIT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
