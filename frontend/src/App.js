import React from 'react';
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'
import HomeScreen from './screens/homescreen';

import productScreen from './screens/productScreens';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import  cartScreen  from './screens/CartScreen';
import SigninScreen from './screens/signinscreen';
import { useSelector } from 'react-redux';

function App() {


  const userSignin = useSelector(state=>state.userSignin);
  const {userInfo} = userSignin;

  const openMenu =() =>{
    document.querySelector(".sidebar").classList.add("open");     
       
  }
  
  const closeMenu =() =>{
    document.querySelector(".sidebar").classList.remove("open");     
       
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
      <header className="header">
          <div className="brand">

              <button onClick={openMenu}>
                  &#9776;
              </button>

              <Link to='/'>ShopingMall</Link>
          </div>

          <div className="header-links">
              <a href="cart.html">Cart</a>
              {
                userInfo ? <Link to="/profile">{userInfo.name}</Link>:

              <Link to="/signin">Sign In</Link>
          
              }
          </div>

      </header>
      <aside className="sidebar">

          <h3>
              Shoping Categories
          </h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul>
              <li>
                  <a href="index.html">Pants</a>
              </li>
              
              <li>
                  <a href="index.html">Shirt</a>
              </li>
          </ul>

      </aside>
      <main className="main">
          <div className="content">
            <Route path="/signin" component={SigninScreen}/>
            <Route path="/product/:id" exact={true} component={productScreen}/>
            <Route path="/" exact={true} component={HomeScreen}/>
            <Route path="/cart/:id?" exact={true} component={cartScreen}/>
              
          </div>
      </main>
      <footer className="footer">
          All right reserved.
      </footer>
  </div>
</BrowserRouter>
  );
}

export default App;
