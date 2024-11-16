import React, { useContext, useState } from 'react';
import styles from './cssFiles/App.module.css';
import Navbar from './Navbar';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Register from './Register';
import About from './About';
import Verify from './Verify';
import Activate from './Activate';
import Login from './Login';
import Logout from './Logout';
import Main from './Main';
import VerifyLoginToken from './VerifyLoginToken';
import Profile from './Profile';
import Cart from './Cart';
// import MyProducts from './MyProducts';
import Products from './Products';
import ScrollToTopButton from './ScrollToTopButton';

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div>
      <BrowserRouter>
      <header className={styles.header}>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/about" element={<About/>} />
        {/* <Route path="/contact" component={Contact} /> */}
        <Route path="/register" element={<Register/>} />
        <Route path="/verify" element={<Verify/>} />
        <Route path="/activate/:token" element={<Activate/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/verifyLoginToken" element={<VerifyLoginToken/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/products" element={<Products/>} />
      </Routes>
    </BrowserRouter>
    <ScrollToTopButton />
    </div>
  );
}

export default App;
