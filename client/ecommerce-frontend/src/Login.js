// src/components/Login.js
import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import './externalCss/Login.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userType: 'BUYER',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/users/processLogin/', formData)
      .then(res => {
        navigate('/verifyLoginToken', {state: {token: res.data.payload.token}});
        })
      .catch(err => alert(err.response.data.message[0].msg));
  };

  return (
    <Container className="login-container">
      <Card className="login-card">
        <Card.Body>
          <h2 className="login-title">Login</h2>
          <Form onSubmit={handleSubmit} >
          <Form.Group controlId="formLoginAs" className="form-group">
              <Form.Label>Login As</Form.Label>
              <Form.Select name='userType' onChange={handleChange} aria-label="Login As">
                <option value="BUYER">BUYER</option>
                <option value="SELLER">SELLER</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formEmail" className="form-group">
              <Form.Label>Email</Form.Label>
              <Form.Control name='email' type="email" onChange={handleChange} placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formPassword" className="form-group">
              <Form.Label>Password</Form.Label>
              <Form.Control name='password' type="password" onChange={handleChange} placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit" className="login-button">
              Login
            </Button>
          </Form>
          <div className='loginRender'>
            Not Registered Yet? <Link to='/register'>Register</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
