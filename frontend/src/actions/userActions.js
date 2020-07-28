import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILED, USER_REGISTER_FAILED, USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST } from "../constants/userConstants";
import Axios from 'axios'
import Cookie from 'js-cookie'
const signin = (email,password)=>async (dispatch)=>{
    dispatch({type: USER_SIGNIN_REQUEST, payload:{email,password}})
    try{
        const {data} =await Axios.post("/api/users/signin",{email,password});
        dispatch({type: USER_SIGNIN_SUCCESS,payload : data})
        Cookie.set('userInfo',JSON.stringify(data));
    }catch(e){
        dispatch({type: USER_SIGNIN_FAILED,payload : e.message})
    }
}


const Register = (name,email,password)=>async (dispatch)=>{
    dispatch({type: USER_REGISTER_REQUEST, payload:{name,email,password}})
    try{
        const {data} =await Axios.post("/api/users/register",{name,email,password});
        dispatch({type: USER_REGISTER_SUCCESS,payload : data})
        Cookie.set('userInfo',JSON.stringify(data));
    }catch(e){
        dispatch({type: USER_REGISTER_FAILED,payload : e.message})
    }
}

export {signin,Register};