import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Register } from '../actions/userActions';


function RegisterScreen (props)
{

    const userRegister = useSelector(state=>state.userRegister);

    const {loading,userInfo,error}= userRegister;
    const dispatch =useDispatch();
    const [name, setName] = useState('');
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
    dispatch(Register(name,email,password));
}
    
return <div className="form">
    <form onSubmit={submitHandler}>
        <ul className="form-container">
            <li>
                <h2>
                    register
                </h2>
            </li>
            <li>
                {loading && <div>Loading....</div>}
                {error && <div>{error}</div>}
            </li>
            
            <li>
                <label htmlFor="name">
                    Name
                </label>
                <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}/>
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
                <label htmlFor="repassword">Password</label>
                
                <input type="repassword" name="repassword" id="repassword" onChange={(e) => setPassword(e.target.value)}/>
            </li>
            <li>
                <button type="submit" className="button primary ">
                Sign up
                </button>
            </li>
            <li>
                Already have an account
            </li>
            <li>
                <Link to="/signin" className="button full-width text-center secondary">Sign in</Link>
            </li>
        </ul>

    </form>
    
</div>
}
export default RegisterScreen;
