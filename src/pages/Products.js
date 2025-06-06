import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './styles.css';

const productsData = {
  phones: [
    { id: 1, name: 'iPhone 13', price: '$799', image: 'https://media.croma.com/image/upload/v1708676410/Croma%20Assets/Communication/Mobiles/Images/249841_0_oldsz6.png' },
    { id: 2, name: 'Samsung Galaxy S21', price: '$699', image: 'https://sell.gameloot.in/wp-content/uploads/sites/4/2022/06/Samsung-Galaxy-S21-Plus-5G.jpg' },
    { id: 3, name: 'Google Pixel 6', price: '$599', image: 'https://m.media-amazon.com/images/I/71YJ2QMIM6L.jpg' },
    { id: 4, name: 'OnePlus 9', price: '$729', image: 'https://sathya.in/media/55463/catalog/oneplus-mobile-9-pro-5g-stellar-black8gb-ram128gb-storage.jpg' },
    { id: 5, name: 'Xiaomi Mi 11', price: '$749', image: 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1619082747.31483931!400x400!85.png' },
    { id: 6, name: 'Realme GT', price: '$699', image: 'https://images.jdmagicbox.com/quickquotes/images_main/realme-gt-5g-ram-12-gb-256-gb-racing-yellow-240053177-067cf.png' }
  ],
  laptops: [
    { id: 1, name: 'MacBook Air', price: '$999', image: 'https://i.ebayimg.com/images/g/ZpYAAOSwFCZl5tBU/s-l400.png' },
    { id: 2, name: 'Dell XPS 13', price: '$1099', image: 'https://pckumar.in/wp-content/uploads/2024/12/OXN9345140001RIN.jpg' },
    { id: 3, name: 'HP Spectre x360', price: '$1199', image: 'https://brain-images-ssl.cdn.dixons.com/8/0/10258208/l_10258208_003.jpg' },
    { id: 4, name: 'Lenovo ThinkPad X1', price: '$1299', image: 'https://store.lenovo.com/media/catalog/product/cache/90c9f6aca4e4b4913161c59294bbd070/2/0/20XWS1XJ00-1_1.webp' },
    { id: 5, name: 'Asus ZenBook 14', price: '$1099', image: 'https://m.media-amazon.com/images/I/71d0ewMRJNL._AC_UF1000,1000_QL80_.jpg' },
    { id: 6, name: 'Microsoft Surface Laptop 4', price: '$1299', image: 'https://radiant.in/wp-content/uploads/2023/06/Microsoft-Surface-Laptop-4-Banner.jpg' }
  ],
  headphones: [
    { id: 1, name: 'AirPods Pro', price: '$249', image: 'https://www.action.pk/cdn/shop/products/LYCiR8OBRB_2048x.jpg?v=1705925095' },
    { id: 2, name: 'Sony WH-1000XM4', price: '$348', image: 'https://images-cdn.ubuy.co.in/660c513c89bf021e5b437815-sony-wh-1000xm4-wireless-noise-canceling.jpg' },
    { id: 3, name: 'Bose QuietComfort 35 II', price: '$299', image: 'https://travellingfoodie.net/wp-content/uploads/2021/06/Bose-QuietComfort-35-Headphones-QC35-Travelling-Foodie-2.jpg.webp' },
    { id: 4, name: 'Sennheiser Momentum', price: '$399', image: 'https://cdn.head-fi.org/a/10284055.jpg' },
    { id: 5, name: 'JBL Live 650BTNC', price: '$199', image: 'https://nayejaisa.com/wp-content/uploads/2024/06/Images-1945.webp' },
    { id: 6, name: 'Beats Studio3 Wireless', price: '$349', image: 'https://m.media-amazon.com/images/I/61GIAZMkcDL._AC_UF1000,1000_QL80_.jpg' }
  ]
};

const exchangeRate = 83;

function Products() {
  const { category } = useParams();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const getPriceInINR = (price) => {
    const usd = parseFloat(price.replace('$', '').replace(',', ''));
    const inr = usd * exchangeRate;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(inr);
  };

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(item => item.id === product.id);

    if (productIndex !== -1) {
      updatedCart[productIndex].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getCategoryTitle = (cat) => {
    switch (cat) {
      case 'phones': return 'Mobile Phones';
      case 'laptops': return 'Laptops';
      case 'headphones': return 'Headphones';
      default: return 'All Products';
    }
  };

  const renderProductSection = (type, title) => (
    <section key={type}>
      <h3>{title}</h3>
      <Row className="mt-4">
        {productsData[type].map((product) => (
          <Col md={4} key={product.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.image} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Price: {getPriceInINR(product.price)}</Card.Text>
                <Button variant="primary" onClick={() => addToCart(product)}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );

  const availableCategories = Object.keys(productsData);
  const validCategory = category && availableCategories.includes(category);

  return (
    <Container className="mt-4 products-page">
      <h2>{getCategoryTitle(category)}</h2>

      {validCategory
        ? renderProductSection(category, getCategoryTitle(category))
        : availableCategories.map(cat =>
            renderProductSection(cat, getCategoryTitle(cat))
          )}
    </Container>
  );
}

export default Products;
