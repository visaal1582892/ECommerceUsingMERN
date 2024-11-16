import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Card, Carousel, Col, Row, Container } from 'react-bootstrap';
import axios from 'axios';
import imageToBase64 from './helpers/imageToBase64';
import { AuthContext } from './AuthContext';
import './externalCss/Products.css'
import { useScroll } from './ScrollContext';
import SinglePageNavigation from './SinglePageNavigation';

const Products = () => {
  const { isLoggedIn, auth } = useContext(AuthContext);
  const { section1Ref, section2Ref, section3Ref, section4Ref } = useScroll();
  const [form, setForm] = useState({
    sellerId: '',
    name: '',
    category: 'ELECTRONICS',
    price: 0,
    image: ''
  });
  const [products, setProducts] = useState([]);

  const fetchProducts = (sellerId) => {
    axios.post('http://localhost:3001/api/products/fetchSellerProducts', { sellerId: sellerId })
      .then(res => setProducts(res.data.payload.sellerProducts))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const sellerId = auth._id;
    fetchProducts(sellerId);
  }, [auth._id]);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    const sellerId = auth._id;
    setForm({
      ...form,
      sellerId: sellerId,
      [name]: value
    });
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const sellerId = auth._id;
    setForm({
      ...form,
      sellerId: sellerId,
      [name]: parseFloat(value) || 0 // Ensure price is parsed as float or set to 0
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const image = await imageToBase64(file);
    const sellerId = auth._id;
    setForm({
      ...form,
      sellerId: sellerId,
      image: image
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/products/addProduct', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const newProduct = response.data.payload.product;
      setProducts(prevProducts => [...prevProducts, newProduct]);
      alert(response.data.message);
      setForm({
        sellerId: '',
        name: '',
        category: 'ELECTRONICS',
        price: 0,
        image: ''
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

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

  if (isLoggedIn) {
    return (
      <div className="products-page">
        <Form onSubmit={handleSubmit} className="product-form-card">
          <Row className="form-group">
            <Col>
              <Form.Group controlId="formProductName">
                <Form.Label className="form-label">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleTextChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formProductCategory">
                <Form.Label className="form-label">Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={form.category}
                  onChange={handleTextChange}
                >
                  <option value="ELECTRONICS">ELECTRONICS</option>
                  <option value="FASHION">FASHION</option>
                  <option value="MAIN_APPLIANCES">MAIN_APPLIANCES</option>
                  <option value="GROCERY">GROCERY</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formProductPrice">
                <Form.Label className="form-label">Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleNumberChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formProductImage">
                <Form.Label className="form-label">Image</Form.Label>
                <Form.Control
                  name="image"
                  type='file'
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="submit-button">
            <Button className="btn-primary" size='sm' variant="primary" type="submit">Add Product</Button>
          </div>
        </Form>

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
  } else {
    return (<div>Page not available</div>);
  }
};

export default Products;
