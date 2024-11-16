// src/components/UserProfile.js
import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { AuthContext } from './AuthContext';
import './externalCss/Profile.css';
import axios from 'axios';

function Profile() {
  const { auth, isLoggedIn } = useContext(AuthContext);
  const [imageSrc, setImageSrc] = useState("");
  if(isLoggedIn === true) {
    axios.post('http://localhost:3001/api/users/getUserImage', {email: auth.email})
        .then(res => {
            console.log(imageSrc);
            setImageSrc(res.data.payload.imageSrc);
        })
        .catch(err => console.log(err));
  return (
    <Container className="profile-container">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="profile-card">
            <Card.Body>
              <div className="profile-header">
                <Image src={imageSrc} roundedCircle className="profile-image" />
                <h2 className="profile-name">{auth.name}</h2>
              </div>
              <Card.Text className="profile-text">
                <strong>User Type:</strong> {auth.userType}
              </Card.Text>
              <Card.Text className="profile-text">
                <strong>Email:</strong> {auth.email}
              </Card.Text>
              <Card.Text className="profile-text">
                <strong>Address:</strong> {auth.address}
              </Card.Text>
              <Card.Text className="profile-text">
                <strong>Phone:</strong> {auth.phone}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
}

export default Profile;
