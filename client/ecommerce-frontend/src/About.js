// src/components/About.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './externalCss/About.css';

function About() {
  return (
    <Container className="about-container">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card className="about-card">
            <Card.Body>
              <Card.Title className="about-title">About Us</Card.Title>
              <Card.Text className="about-text">
                Welcome to our e-commerce platform! We are dedicated to providing the best shopping experience for our customers. Our platform offers a wide range of products, from electronics to fashion, ensuring that you find everything you need in one place.
              </Card.Text>
              <Card.Text className="about-text">
                <strong>Our Mission:</strong> Our mission is to make online shopping easy, convenient, and enjoyable for everyone. We strive to offer high-quality products at competitive prices, with fast and reliable shipping.
              </Card.Text>
              <Card.Text className="about-text">
                <strong>Our Values:</strong> We value customer satisfaction above all else. Our team is committed to providing excellent customer service, and we are always here to assist you with any questions or concerns. We believe in building trust and long-term relationships with our customers.
              </Card.Text>
              <Card.Text className="about-text">
                <strong>Features:</strong> Our platform offers a user-friendly interface, secure payment options, and a seamless checkout process. We continuously update our inventory to bring you the latest products and trends. With our easy return policy, you can shop with confidence.
              </Card.Text>
              <Card.Text className="about-text">
                Thank you for choosing our e-commerce platform. We look forward to serving you!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
