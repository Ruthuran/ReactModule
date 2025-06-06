import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-wow">
      <Container>

        <Navbar.Brand as={Link} to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="https://img.freepik.com/premium-vector/gadget-mobile-store-logo-branding-icon_1152716-1405.jpg"
            alt="MyStore Logo"
            className="navbar-logo"
          />
          <span className="navbar-brand-text ms-2">MyStore</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">

          <Nav className="ms-auto navbar-links">
            <NavLink className="nav-link" to="/products">
              <span className="nav-link-text">Products</span>
            </NavLink>

            <NavLink className="nav-link d-flex align-items-center" to="/addcart">
              <FaShoppingCart className="cart-icon me-1" />
              <span className="nav-link-text">Cart</span>
              {/* Optional cart count badge */}
              {/* <Badge bg="light" text="dark" className="ms-1">3</Badge> */}
            </NavLink>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
