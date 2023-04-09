import * as constant from '../constant/cartConstant'
import axios from 'axios'


export const addCartAction=(id,qty)=>async(dispatch,getState)=>{
     const {data}=await axios.get(`/api/products/${id}`)

    dispatch({
        type:constant.CART_ADD_ITEM,
        payload:{
            product:data._id,
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            qty
        }
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const cartRemoveAction=(id)=>(dispatch,getState)=>{
    dispatch({
        type:constant.CART_REMOVE_ITEM,
        payload:id
    })
    localStorage.removeItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress=(data)=>(dispatch)=>{
    dispatch({
        type:constant.CART_SAVE_SHIPPING_ADDRESS,
        payload:data,
    })
    localStorage.getItem('shippingAddress',JSON.stringify(data))
}

export const savePaymentMethod=(data)=>(dispatch)=>{
    dispatch({
        type:constant.CART_SAVE_PAYMENT_METHOD,
        payload:data,
    })
    localStorage.getItem('paymentMethod',JSON.stringify(data))
}