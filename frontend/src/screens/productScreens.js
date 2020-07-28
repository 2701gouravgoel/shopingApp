import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions.js';


function ProductScreen (props)
{

    const [qty, setqty] = useState(1);
    const productDetials = useSelector(state => state.productDetails);

    const {product, loading, error } = productDetials;
    const dispatch =useDispatch();


    const handleaddtocart = () =>{
        props.history.push("/cart/"+ props.match.params.id +"?qty="+qty)
    }


    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () =>{
            //
        }

    },[])



    
return <div >
    <div className="back-to-result">
        <Link to="/">Back To result</Link>   
    </div>
    {loading? <div>Loading ...</div>:
        error?<div>{error}</div>: 
        (<div className="details">
            <div className="details-image">
                <img src={product.image} alt="product"></img>
            </div>
            <div className="details-info">
                <ul>
                    <li>
                        <h4>{product.name}</h4>
                    </li>
                    
                    <li>
                        {product.rating} Stars ({product.views} Reviews)
                    </li>
                    
                    <li>
                        Price: <b>Rs {product.price}</b>
                    </li>
                    
                    <li>
                        Description:
                        <div>
                            {product.descriptions}
                        </div>
                    </li>
                </ul>
            </div>
            <div className="details-action">

                <ul>
                    <li>
                        Price: {product.price}
                    </li>
                    
                    <li>
                        Status: {product.countinStocks >0 ? "Available":"Out of Stock"
                        }
                    </li>
                    <li>
                        Qty: <select value={qty} onChange={(e) => {setqty(e.target.value)}}>
                            {[...Array(product.countinStocks).keys()].map(x =>
                                <option value={x+1} key={x+1}> {x+1}</option>
                                )}    
                            </select>                    
                    </li>
                    <li>
                        {product.countinStocks >0 && <button onClick={handleaddtocart} className="button">Add to cart</button>
                        }
                    </li>
                </ul>
            </div>
        </div>)
    }
</div>
}
export default ProductScreen;
