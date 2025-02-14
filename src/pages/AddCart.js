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
      updatedCart[productIndex].quantity += action === 'increase' ? 1 : -1;
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({ ...prev, [name]: value }));
  };

  
  const handlePlaceOrder = () => {
    if (!customerDetails.name || !customerDetails.address || !customerDetails.phone) {
      alert('Please fill in all details');
    } else {
      console.log('Customer Details:', customerDetails);
      localStorage.setItem('cart', JSON.stringify([])); 
      setCart([]); 
      setSuccessModal(true); 
    }
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
                  <Button variant="danger" onClick={() => removeFromCart(product.id)}>Remove</Button>
                  <Button variant="info" onClick={() => updateQuantity(product.id, 'increase')} className="ms-2">+</Button>
                  <Button variant="warning" onClick={() => updateQuantity(product.id, 'decrease')} className="ms-2">-</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <Button variant="secondary" onClick={() => navigate('/')} className="mt-4">
        Continue Shopping
      </Button>

      {cart.length > 0 && (
        <Button variant="success" onClick={() => setShowModal(true)} className="mt-4">
          Place Order
        </Button>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delivery Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={customerDetails.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
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
