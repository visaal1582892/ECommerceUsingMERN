// src/components/Main.js
import React, { useEffect, useState, useContext } from 'react';
import { Carousel, Container, Row, Col, Card, Button } from 'react-bootstrap';
import './externalCss/Main.css';
import './externalCss/Products.css'
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useScroll } from './ScrollContext';
import SinglePageNavigation from './SinglePageNavigation';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import image4 from './images/image4.jpg';
import image5 from './images/image5.jpg';
import image6 from './images/image6.jpg';


function Main() {
  const { section1Ref, section2Ref, section3Ref, section4Ref } = useScroll();
  const { isLoggedIn, auth } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    axios.get('http://localhost:3001/api/products/fetchAllProducts')
      .then(res => setProducts(res.data.payload.products))
      .catch(err => console.log(err));
  };
  useEffect(() => {
    fetchProducts();
  }, [])

  const handleClick = async (productId) => {
    if (productId) {
      const userId = await auth._id;
      const data = await {
        productId: productId,
        userId: userId
      }
      axios.put('http://localhost:3001/api/users/addToCart', data)
        .then(res => {console.log(res)
          alert('product added to cart successfully');
        })
        .catch(err => console.log(err))
    }
  }
  const mainImages = [image1,image2,image3,image4,image5,image6,];

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const renderCarousel = (categoryName) => {
    const categoryProducts = products.filter(product => product.category === categoryName);
    const chunks = chunkArray(categoryProducts, 4);

    if(categoryProducts.length > 0) {
    return (
      <Carousel className="product-carousel" controls={true} indicators={false} interval={5000} pause="hover">
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
                      {(isLoggedIn)?<Button className="btn-primary" onClick={() => handleClick(product._id)} size='sm' variant="primary">Add to Cart</Button> : <></>}
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
            <h2 className='empty'>No products Available in this Category</h2>
        )
    }
  };

  return (
    <div className="products-page">
      <Carousel fade='true' pause='false' className="main-carousel" controls={false} indicators={true} interval={5000}>
        {mainImages.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={image}
              alt='loading'
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <SinglePageNavigation/>

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

export default Main;
