import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './styles.css';

function Home() {
  const cardImageStyle = {
    height: '300px',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  };

  const handleMouseOver = (e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <Container className="mt-4 p-0 home-page" fluid>
      <h2 className="text-center">Welcome to Our Store</h2>

      <Row className="mt-4">
        <Col md={4} className="mb-4">
          <div className="d-flex flex-column align-items-center">
            <h4 className="text-center mb-3">Phones</h4>
            <Link to="/products/phones" aria-label="Browse Phones" className="image-link">
              <Image
                src="https://www.91-cdn.com/hub/wp-content/uploads/2023/12/Top-phone-brands.png"
                alt="Various phone brands"
                className="w-100"
                style={cardImageStyle}
                rounded
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              />
            </Link>
          </div>
        </Col>

        <Col md={4} className="mb-4">
          <div className="d-flex flex-column align-items-center">
            <h4 className="text-center mb-3">Laptops</h4>
            <Link to="/products/laptops" aria-label="Browse Laptops" className="image-link">
              <Image
                src="https://i.rtings.com/assets/pages/ZRskDBBI/best-laptop-brands-20230420-3-medium.jpg?format=auto"
                alt="Various laptop brands"
                className="w-100"
                style={cardImageStyle}
                rounded
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              />
            </Link>
          </div>
        </Col>

        <Col md={4} className="mb-4">
          <div className="d-flex flex-column align-items-center">
            <h4 className="text-center mb-3">Headphones</h4>
            <Link to="/products/headphones" aria-label="Browse Headphones" className="image-link">
              <Image
                src="https://www.livemint.com/lm-img/img/2024/09/12/1600x900/earphones_and_headphones_1726128766209_1726128770170.jpg"
                alt="Various headphones"
                className="w-100"
                style={cardImageStyle}
                rounded
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              />
            </Link>
          </div>
        </Col>
      </Row>

      <footer className="text-center mt-5 py-3 border-top bg-light">
        <p className="mb-0">&copy; 2025 Our Store. All rights reserved.</p>
      </footer>
    </Container>
  );
}

export default Home;
