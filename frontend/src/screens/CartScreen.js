import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addToCart , removefromcart } from '../actions/cartActions';
import { Link } from 'react-router-dom';

function CartScreen(props)
{

    const cart =useSelector(state => state.cart);

    const {cartItems} = cart;

    const productId = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split("=")[1]):1;

    const dispatch = useDispatch();


    const removeFromcartHandler = (productId) =>{
        dispatch(removefromcart(productId))
    }

    useEffect(() =>{
        if(productId){
            dispatch(addToCart(productId,qty));
        }
    },[]);

    const checkoutHandler = () =>{
        props.history.push("/signin?redirect=shipping")
    }

    return <div className='cart'>
        <div className='cart-list'>


        {cartItems.length ==0?
                <div>
                    Cart is empty
            </div>:
        <ul className="cart-list-container" >
            <li>
                <h3>
                    Shoping Cart
                </h3>
                <div>
                    Price
                </div>
            </li>
            {
                cartItems.map(item =>
                    <li className="prod">   
                        <div className="cart-image">
                            <img className="img" className="cart-image" src={item.image} alt="product"/>
                        </div>

                        <div className="cart-name">
                            <div>
                                <Link to={"/product/"+item.product}>
                                {item.name}
                                </Link>
                            </div>
                            <div>
                                Qty:
                                <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product ,e.target.value))}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                                <button  type="button" className="button" onClick={() => removeFromcartHandler(item.product)}>Delete</button>
                            </div>
                        </div>
                        <div className="cart-price">
                            Rs{item.price}
                        </div>
                    
                     </li>
                )
            }
            
        </ul>
        }

        </div>
        <div className='cart-action'>
            <h3>
                Subtotal ({cartItems.reduce((a,c) => a + c.qty,0)} items)
                :
            ${cartItems.reduce((a,c) => a+ c.price*c.qty,0)}
            </h3>
            <button onClick={checkoutHandler} className="button primary full-width  " disabled={cartItems.length === 0}>
                Proceed to checkout
            </button>
        </div>
    </div>
}

export  default CartScreen;