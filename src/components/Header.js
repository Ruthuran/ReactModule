import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa'; 


function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-wow">
      <Container>
        
        <Navbar.Brand href="/" className="navbar-brand">
          <img
            src="https://img.freepik.com/premium-vector/gadget-mobile-store-logo-branding-icon_1152716-1405.jpg" 
            alt="Logo"
            className="navbar-logo"
          />
          <span className="navbar-brand-text">MyStore</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">

          <Nav className="ml-auto navbar-links">
            <Link className="nav-link" to="/products">
              <span className="nav-link-text">Products</span>
            </Link>
            <Link className="nav-link" to="/addcart">
              <FaShoppingCart className="cart-icon" />
              <span className="nav-link-text">Cart</span>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
