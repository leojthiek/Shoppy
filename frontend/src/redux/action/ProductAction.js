import * as constant from "../constant/productListConstant"
import axios from "axios"

export const productListAction=(keyword='')=>async(dispatch)=>{
   try {
      dispatch({type:constant.PRODUCT_LIST_REQUEST})
       
      const {data}=await axios.get(`/api/products?keyword=${keyword}`)
      dispatch({
        type:constant.PRODUCT_LIST_SUCCESS,
        payload:data
      })

   } catch (error) {
      dispatch({
        type:constant.PRODUCT_LIST_FAILURE,
        payload:error.response && error.response.data.message ? error.response.data.message :error.message
      })
   }
}
export const productDetailAction=(id)=>async(dispatch)=>{
   try {
      dispatch({type:constant.PRODUCT_DETAILS_REQUEST})
       
      const {data}=await axios.get(`/api/products/${id}`)
      dispatch({
        type:constant.PRODUCT_DETAILS_SUCCESS,
        payload:data
      })

   } catch (error) {
      dispatch({
        type:constant.PRODUCT_DETAILS_FAILURE,
        payload:error.response && error.response.data.message ? error.response.data.message :error.message
      })
   }
}


export const deleteProductAction=(id)=>async(dispatch,getState)=>{
   try {
     dispatch({
      type:constant.PRODUCT_DELETE_REQUEST
     })
     const {userLogin:{userInfo},}=getState()

     const config={
      headers:{
        
        Authorization:`Bearer ${userInfo.token}`
      }
     }
     await axios.delete(`/api/products/${id}`,config)

     dispatch({
      type:constant.PRODUCT_DELETE_SUCCESS,
     
     })
   } catch (error) {
    dispatch({
      type: constant.PRODUCT_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
   }
  }

  export const productCreateAction=(productData)=>async(dispatch,getState)=>{
   try {
     dispatch({
      type:constant.PRODUCT_CREATE_REQUEST
     })
     const {userLogin:{userInfo},}=getState()

     const config={
      headers:{
        Authorization:`Bearer ${userInfo.token}`
      }
     }
    const {data}= await axios.post(`/api/products`,productData,config)

     dispatch({
      type:constant.PRODUCT_CREATE_SUCCESS,
      payload:data
     
     })
   } catch (error) {
    dispatch({
      type: constant.PRODUCT_CREATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
   }
  }

  export const productUpdateAction=(productData)=>async(dispatch,getState)=>{
    try {
      dispatch({
       type:constant.PRODUCT_UPDATE_REQUEST
      })
      const {userLogin:{userInfo},}=getState()
 
      const config={
       headers:{
        'Content-Type':'application/json',
         Authorization:`Bearer ${userInfo.token}`
       }
      }
     const {data}= await axios.put(`/api/products/${productData._id}`,productData,config)
 
      dispatch({
       type:constant.PRODUCT_UPDATE_SUCCESS,
       payload:data
      
      })
    } catch (error) {
     dispatch({
       type: constant.PRODUCT_UPDATE_FAILURE,
       payload:
         error.response && error.response.data.message
           ? error.response.data.message
           : error.message,
     })
    }
   }


  export const productCreateReviewsAction=(productId,review)=>async(dispatch,getState)=>{
    try {
      dispatch({
       type:constant.PRODUCT_CREATE_REVIEWS_REQUEST
      })
      const {userLogin:{userInfo},}=getState()
 
      const config={
       headers:{
        'Content-Type':'application/json',
         Authorization:`Bearer ${userInfo.token}`
       }
      }
      await axios.post(`/api/products/${productId}/reviews`,review,config)
 
      dispatch({
       type:constant.PRODUCT_UPDATE_SUCCESS,
      
      })
    } catch (error) {
     dispatch({
       type: constant.PRODUCT_CREATE_REVIEWS_FAILURE,
       payload:
         error.response && error.response.data.message
           ? error.response.data.message
           : error.message,
     })
    }
   }


