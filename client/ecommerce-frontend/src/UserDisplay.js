import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import profileIcon from "./images/profileIcon.jpg"
import styles from './cssFiles/UserDisplay.module.css'
import { NavDropdown, Button } from 'react-bootstrap';
import { AuthContext } from './AuthContext';
import axios from 'axios';
const UserDisplay = () => {
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState("");
    const { isLoggedIn, auth } = useContext(AuthContext);
    // const [profileView, setProfileView] = useState(false)
    const handleRegisterClick = () => {
        navigate('/register');
    }

    const handleLoginClick = () => {
        navigate('/login');
    }

    const handleLogoutClick = () => {
        navigate('/logout');
    }

    const handleProfileClick = () => {
        navigate('/profile');
    }

    const handleCartClick = () => {
        navigate('/cart');
    }

    if(isLoggedIn === true) {
        axios.post('http://localhost:3001/api/users/getUserImage', {email: auth.email})
            .then(res => {
                setImageSrc(res.data.payload.imageSrc);
            })
            .catch(err => console.log(err));
        return (
            <div className={styles.userDisplay}>
                <img className={styles.profileImage} src={imageSrc} alt='loadingImg'></img>
                <NavDropdown title="" className={styles.navDropdown}>
                <NavDropdown.Item onClick={handleProfileClick}>My Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={handleCartClick}>Cart</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogoutClick}>Logout</NavDropdown.Item>
                </NavDropdown>
            </div>
        )
    }
    else{
        return (
            <div>
            <Button variant="primary" className="mr-2 custom-button" onClick={handleRegisterClick}>Register</Button>
            <Button variant="secondary" className="custom-button" onClick={handleLoginClick}>Login</Button>
            </div>
          )
    }
}

export default UserDisplay