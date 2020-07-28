import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import {cartReducer} from './reducers/cartreducer';
import { userSigninReducer, userRegisterReducer } from './reducers/userReducer';


const cartItems =Cookie.getJSON("cartItems")||[];

const userInfo =Cookie.getJSON("userInfo")||[];


const initalState={cart :{cartItems},userSignin:{userInfo}};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer, 
    cart : cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
})

const composeEhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store  = createStore(reducer,initalState,composeEhancer(applyMiddleware(thunk)));

export default store;