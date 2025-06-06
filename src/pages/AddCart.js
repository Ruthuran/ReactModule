import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const exchangeRate = 83;

function AddCart() {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({ name: '', address: '', phone: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const getPriceInINR = (price) => parseFloat(price.replace('$', '').replace(',', '')) * exchangeRate;

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (productId, action) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(item => item.id === productId);
    if (productIndex !== -1) {
      const currentQty = updatedCart[productIndex].quantity;
      if (action === 'increase') {
        updatedCart[productIndex].quantity = currentQty + 1;
      } else if (action === 'decrease' && currentQty > 1) {
        updatedCart[productIndex].quantity = currentQty - 1;
      }
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    const { name, address, phone } = customerDetails;

    if (!name || !address || !phone) {
      alert('Please fill in all details');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    console.log('Customer Details:', customerDetails);
    localStorage.setItem('cart', JSON.stringify([]));
    setCart([]);
    setShowModal(false);
    setSuccessModal(true);
  };

  const handleRedirect = () => {
    setSuccessModal(false);
    navigate('/');
  };

  return (
    <Container className="mt-4">
      <h2>Your Cart</h2>

      {cart.length > 0 ? (
        <Row className="mt-4 addcart-page">
          {cart.map((product) => (
            <Col md={4} key={product.id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={product.image} alt={product.name} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>Price: ₹{getPriceInINR(product.price).toFixed(2)}</Card.Text>
                  <Card.Text>Quantity: {product.quantity}</Card.Text>
                  <div className="d-flex justify-content-between flex-wrap">
                    <Button variant="danger" onClick={() => removeFromCart(product.id)}>Remove</Button>
                    <div className="mt-2 mt-md-0">
                      <Button variant="info" onClick={() => updateQuantity(product.id, 'increase')} className="me-2">+</Button>
                      <Button variant="warning" onClick={() => updateQuantity(product.id, 'decrease')}>-</Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <div className="mt-4">
        <Button variant="secondary" onClick={() => navigate('/')}>Continue Shopping</Button>{' '}
        {cart.length > 0 && (
          <Button variant="success" onClick={() => setShowModal(true)}>Place Order</Button>
        )}
      </div>

      {/* Delivery Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delivery Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={customerDetails.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formAddress" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                name="address"
                value={customerDetails.address}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                name="phone"
                value={customerDetails.phone}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handlePlaceOrder}>Confirm Order</Button>
        </Modal.Footer>
      </Modal>

      {/* Order Success Modal */}
      <Modal show={successModal} onHide={() => setSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Order Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your order has been successfully placed!</p>
          <h5>Customer Details:</h5>
          <p><strong>Name:</strong> {customerDetails.name}</p>
          <p><strong>Address:</strong> {customerDetails.address}</p>
          <p><strong>Phone:</strong> {customerDetails.phone}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleRedirect}>Continue Shopping</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AddCart;
