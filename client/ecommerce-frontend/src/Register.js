// src/components/RegistrationForm.js
import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import './externalCss/Register.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import imageToBase64 from './helpers/imageToBase64';
import profileIcon from "./images/profileIcon.jpg"

function RegistrationForm() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(profileIcon);
  const [showText, setShowText] = useState(false);
  const [formData, setFormData] = useState({
    userType: 'BUYER',
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    console.log(formData);
  };

  const handleUploadPic = async(e) => {
    const file = e.target.files[0];
    if(file){
      const imagePic = await imageToBase64(file);
      setImagePreview(imagePic);
      setFormData(() => {
      return{
        ...formData,
        image: imagePic,
      }
    })
    }
    else{
      setImagePreview(profileIcon);
    }
  }

  const handleMouseEnter = () => {
    setShowText(true);
  };

  const handleMouseLeave = () => {
    setShowText(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios.post('http://localhost:3001/api/users/processRegister', formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }}
    )
      .then(response => {console.log(response.data)
        navigate('/verify');
      })
      .catch(error => console.log(error));
  };

  return (
    <Container className="register-container">
      <Card className="register-card">
        <Card.Body>
          <h2 className="register-title">Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formImage" className="file-input-group">
              <div className="file-input-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Form.Label className="file-input-label">
                  <div className="circular-button">
                    <img src={imagePreview} alt='ImagePreview' className="image-preview" />
                    {showText && <span className="add-photo-text">📸<br/>Add Photo</span>}
                  </div>
                </Form.Label>
                <Form.Control
                  name='image'
                  type="file"
                  className="file-input"
                  onChange={handleUploadPic}
                  accept="image/*"
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formRegisterAs" className="form-group">
              <Form.Label>Register As</Form.Label>
              <Form.Select name='userType' onChange={handleChange} aria-label="Register As">
                <option value="BUYER">BUYER</option>
                <option value="SELLER">SELLER</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control name='name' onChange={handleChange} type="text" placeholder="Enter your name" required />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control name='email' onChange={handleChange} type="email" placeholder="Enter your email" required />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control name='password' onChange={handleChange} type="password" placeholder="Enter your password" required />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control name='address' onChange={handleChange} type="text" placeholder="Enter your address" required />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control name='phone' onChange={handleChange} type="tel" placeholder="Enter your phone number" required />
            </Form.Group>

            <Button variant="primary" type="submit" className="register-button">
              Register
            </Button>
          </Form>
          <div className='loginRender'>
            already have an Account? <Link to='/login'>Login</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RegistrationForm;

