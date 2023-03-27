import * as constant from "../constant/userConstant"
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


export const userDetailsAction =(id) => async (dispatch,getState) => {
   try {
     dispatch({
       type: constant.USER_DETAILS_REQUEST,
     })
     const {userLogin:{userInfo}} = getState()
     const config = {
       headers: {
        //  "Content-Type": "application/json",
         Authorization:`Bearer ${userInfo.token}`
       },
     }
     const { data } = await axios.get(`/users/${id}`,config)
 
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
 

 export const updateUserProfileAction = (user) => async (dispatch,getState) => {
  try {
    dispatch({
      type: constant.USER_UPDATE_PROFILE_REQUEST,
    })
    const {userLogin:{userInfo}} = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${userInfo.token}`
      },
    }
    const { data } = await axios.put(`/users/profile`,user,config)

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
