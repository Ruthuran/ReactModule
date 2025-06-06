import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './styles.css';

function Home() {
  const categories = [
    {
      name: 'Phones',
      link: '/products/phones',
      img: 'https://www.91-cdn.com/hub/wp-content/uploads/2023/12/Top-phone-brands.png',
      alt: 'Various phone brands',
    },
    {
      name: 'Laptops',
      link: '/products/laptops',
      img: 'https://i.rtings.com/assets/pages/ZRskDBBI/best-laptop-brands-20230420-3-medium.jpg?format=auto',
      alt: 'Various laptop brands',
    },
    {
      name: 'Headphones',
      link: '/products/headphones',
      img: 'https://www.livemint.com/lm-img/img/2024/09/12/1600x900/earphones_and_headphones_1726128766209_1726128770170.jpg',
      alt: 'Various headphones',
    },
  ];

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
      <h2 className="text-center mb-5">Welcome to Our Store</h2>

      <Row>
        {categories.map((category, index) => (
          <Col md={4} className="mb-4" key={index}>
            <div className="d-flex flex-column align-items-center">
              <h4 className="text-center mb-3">{category.name}</h4>
              <Link
                to={category.link}
                aria-label={`Browse ${category.name}`}
                className="image-link"
              >
                <Image
                  src={category.img}
                  alt={category.alt}
                  className="w-100"
                  style={cardImageStyle}
                  rounded
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                />
              </Link>
            </div>
          </Col>
        ))}
      </Row>

      <footer className="text-center mt-5 py-3 border-top bg-light">
        <p className="mb-0">&copy; 2025 Our Store. All rights reserved.</p>
      </footer>
    </Container>
  );
}

export default Home;
