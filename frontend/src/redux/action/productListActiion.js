import * as constant from "../constant/productListConstant"
import axios from "axios"

export const productListAction=()=>async(dispatch)=>{
   try {
      dispatch({type:constant.PRODUCT_LIST_REQUEST})
       
      const {data}=await axios.get('/api/products')
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