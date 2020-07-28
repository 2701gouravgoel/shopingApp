import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartconstants";
import axios from 'axios';
import Cookie from 'js-cookie';

const { default: Axios } = require("axios")



const addToCart = (productId,qty) => async (dispatch ,getState) => {
    try{
        const {data} = await axios.get("/api/product/"+productId);
        dispatch({type: ADD_TO_CART, payload:{
            product:data._id,
            name:data.name,
            image:data.image,
            price:data.price,
            countinStocks:data.countinStocks,
            qty:qty
        }});
        const {cart:{cartItems}} = getState();
        Cookie.set("cartIems" , JSON.stringify(cartItems));
        
    }catch(e){

    }
}

const removefromcart = (productId) => async (dispatch ,getState) => {
    try{
        const {data} = await axios.get("/api/product/"+productId);
        dispatch({type: REMOVE_FROM_CART, payload:data._id})
        const {cart:{cartItems}} = getState();
        Cookie.set("cartIems" , JSON.stringify(cartItems));
        
    }catch(e){

    }
}

export {addToCart , removefromcart}