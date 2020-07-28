import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';


function SigninScreen (props)
{

    const userSignin = useSelector(state=>state.userSignin);

    const {loading,userInfo,error}= userSignin;
    const dispatch =useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    

    useEffect(() => {
        if(userInfo)
        {
            props.history.push("/");
        }
        return () =>{
            //
        }

    },[userInfo])


const submitHandler =(e) =>{
    e.preventDefault();
    dispatch(signin(email,password));
}
    
return <div className="form">
    <form onSubmit={submitHandler}>
        <ul className="form-container">
            <li>
                <h2>
                    SignIn
                </h2>
            </li>
            <li>
                {loading && <div>Loading....</div>}
                {error && <div>{error}</div>}
            </li>
            <li>
                <label htmlFor="email">
                    Email
                </label>
                <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
            </li>
            <li>
                <label htmlFor="password">Password</label>
                
                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
            </li>
            <li>
                <button type="submit" className="button primary ">
                Sign In
                </button>
            </li>
            <li>
                New to ShopingApp?
            </li>
            <li>
                <Link to="/register" className="button full-width text-center secondary">Create your ShopingApp account</Link>
            </li>
        </ul>

    </form>
    
</div>
}
export default SigninScreen;
