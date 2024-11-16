// src/components/Verify.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './externalCss/Verify.css';

function Verify() {
  return (
    <Container className="verify-container">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card className="verify-card">
            <Card.Body>
              <Card.Title className="verify-title">Welcome to Our E-Commerce Platform!</Card.Title>
              <Card.Text className="verify-text">
                We are happy to have you. Please check your email to activate your account.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Verify;
