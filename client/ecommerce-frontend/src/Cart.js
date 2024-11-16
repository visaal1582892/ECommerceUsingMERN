// src/components/Cart.js
import React, { useEffect, useContext, useState } from 'react';
import { Button, Card, Carousel, Col, Row, Container } from 'react-bootstrap';
import './externalCss/Cart.css';
import axios from 'axios';
import {AuthContext} from "./AuthContext";
import { useScroll } from './ScrollContext';
import SinglePageNavigation from './SinglePageNavigation';

const Cart = () => {
  const { auth } = useContext(AuthContext);
  const { section1Ref, section2Ref, section3Ref, section4Ref } = useScroll();
  const [cartProducts, setCartProducts] = useState([]);
  const fetchProducts = (userId) => {
    if(userId){
      axios.post('http://localhost:3001/api/products/getCartProducts', {userId: userId})
      .then(res => setCartProducts(res.data.payload.cartProducts))
      .catch(err => console.log(err));
    }
  }
  useEffect(() => {
    const userId = auth._id;
    fetchProducts(userId);
  }, [auth._id])

  const handleClick = async (productId) => {
    if (productId) {
      const userId = await auth._id;
      const data = await {
        productId: productId,
        userId: userId
      }
      axios.put('http://localhost:3001/api/users/removeFromCart', data)
        .then(res => {console.log(res)
          const userId = auth._id;
          alert('product added to cart successfully');
          fetchProducts(userId);
        })
        .catch(err => console.log(err))
    }
  }

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const renderCarousel = (categoryName) => {
    const categoryProducts = cartProducts.filter(product => product.category === categoryName);
    const chunks = chunkArray(categoryProducts, 4);

    if(categoryProducts.length > 0) {
    return (
      <Carousel className="product-carousel" controls indicators={false} interval={5000} pause="hover">
        {chunks.map((chunk, idx) => (
          <Carousel.Item key={idx} className="carousel-item">
            <Row>
              {chunk.map((product) => (
                <Col key={product._id} md={3}>
                  <Card className="product-card">
                    <Card.Img variant="top" src={product.image} />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>${product.price}</Card.Text>
                      <Button variant="danger" size='sm' onClick={() => handleClick(product._id)} className="remove-button" >Remove</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    );}
    else{
        return(
            <h2 className='empty'>No products of this category are available in Cart</h2>
        )
    }
  };

  return (
    <div className="products-page">
      <SinglePageNavigation />

      <Container className="category-section" ref={section1Ref} id="section1">
        <h2 className="section-title">Electronics</h2>
        {renderCarousel('ELECTRONICS')}
        </Container>

        <Container className="category-section" ref={section2Ref} id="section2">
        <h2 className="section-title">Fashion</h2>
        {renderCarousel('FASHION')}
        </Container>

        <Container className="category-section" ref={section3Ref} id="section3">
        <h2 className="section-title">Main Appliances</h2>
        {renderCarousel('MAIN_APPLIANCES')}
        </Container>

        <Container className="category-section" ref={section4Ref} id="section4">
        <h2 className="section-title">Grocery</h2>
        {renderCarousel('GROCERY')}
        </Container>
    </div>
  );
}

export default Cart;
