import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import './styles.css'; // Ensure your styles are loaded here

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-wow">
      <Container>

        {/* Brand Logo and Title */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="https://img.freepik.com/premium-vector/gadget-mobile-store-logo-branding-icon_1152716-1405.jpg"
            alt="MyStore Logo"
            className="navbar-logo"
          />
          <span className="navbar-title text-white fs-4">MyStore</span>
        </Navbar.Brand>

        {/* Navbar Toggle */}
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">

          {/* Navigation Links */}
          <Nav className="ms-auto navbar-links">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/addcart"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center ${isActive ? 'active' : ''}`
              }
            >
              <FaShoppingCart className="cart-icon me-1" />
              Cart
              {/* <Badge bg="light" text="dark" className="ms-1">3</Badge> */}
            </NavLink>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

