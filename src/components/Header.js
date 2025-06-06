import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './styles.css';

function Home() {
  return (
    <Container fluid className="home-page p-4">
      <h1 className="text-center heading-white mb-5">Welcome to SnapShop</h1>

      <Row className="justify-content-center">
        {/* Phones */}
        <Col md={4} className="mb-4 d-flex flex-column align-items-center">
          <h4 className="text-white mb-3">Phones</h4>
          <Link to="/products/phones" aria-label="Browse Phones">
            <Image
              src="https://www.91-cdn.com/hub/wp-content/uploads/2023/12/Top-phone-brands.png"
              alt="Phones"
              className="category-img"
              rounded
            />
          </Link>
        </Col>

        {/* Laptops */}
        <Col md={4} className="mb-4 d-flex flex-column align-items-center">
          <h4 className="text-white mb-3">Laptops</h4>
          <Link to="/products/laptops" aria-label="Browse Laptops">
            <Image
              src="https://i.rtings.com/assets/pages/ZRskDBBI/best-laptop-brands-20230420-3-medium.jpg?format=auto"
              alt="Laptops"
              className="category-img"
              rounded
            />
          </Link>
        </Col>

        {/* Headphones */}
        <Col md={4} className="mb-4 d-flex flex-column align-items-center">
          <h4 className="text-white mb-3">Headphones</h4>
          <Link to="/products/headphones" aria-label="Browse Headphones">
            <Image
              src="https://www.livemint.com/lm-img/img/2024/09/12/1600x900/earphones_and_headphones_1726128766209_1726128770170.jpg"
              alt="Headphones"
              className="category-img"
              rounded
            />
          </Link>
        </Col>
      </Row>

      {/* Footer */}
      <footer className="text-center mt-5 py-3 border-top bg-light">
        <p className="mb-0">&copy; 2025 SnapShop. All rights reserved.</p>
      </footer>
    </Container>
  );
}

export default Home;
