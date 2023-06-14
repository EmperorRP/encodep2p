import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

export default function NewListingForm({ onCreateListing }) {
  const [seller, setSeller] = useState("");
  const [crypto, setCrypto] = useState("");
  const [price, setPrice] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [maxOrder, setMaxOrder] = useState("");
  const [priceInUSD, setPriceInUSD] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    onCreateListing({
      seller,
      crypto,
      price,
      minMaxOrder: `${minOrder}-${maxOrder}`,
      priceInUSD,
      paymentMethod,
    });

    // Reset the form
    setSeller("");
    setCrypto("");
    setPrice("");
    setMinOrder("");
    setMaxOrder("");
    setPriceInUSD("");
    setPaymentMethod("");
  };

  return (
    <Form onSubmit={handleSubmit} className='bg-dark'>
      <Col className="d-flex align-items-center justify-content-center">
        <h1 className="text-4xl mb-4">Post new listing</h1>
      </Col>
      <Row className="mb-3">
        <Form.Group as={Col} md={6}>
          <Form.Label className="d-flex align-items-center justify-content-center">Seller</Form.Label>
          <Form.Control
            type="text"
            value={seller}
            onChange={(e) => setSeller(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md={6}>
          <Form.Label className="d-flex align-items-center justify-content-center">Crypto</Form.Label>
          <Form.Select
            value={crypto}
            onChange={(e) => setCrypto(e.target.value)}
            required
          >
            <option value="">-- Select Crypto --</option>
            <option value="MATIC">MATIC</option>
            <option value="ETH">ETH</option>
            <option value="USDT">USDT</option>
            <option value="Sepolia">Sepolia</option>
          </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md={6}>
          <Form.Label className="d-flex align-items-center justify-content-center">Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md={6}>
          <Form.Label className="d-flex align-items-center justify-content-center">Max order</Form.Label>
          <Form.Control
            type="number"
            value={maxOrder}
            onChange={(e) => setMaxOrder(e.target.value)}
            required
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md={6}>
          <Form.Label className="d-flex align-items-center justify-content-center">Price in USD</Form.Label>
          <Form.Control
            type="number"
            value={priceInUSD}
            onChange={(e) => setPriceInUSD(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md={6}>
          <Form.Label className="d-flex align-items-center justify-content-center">Payment Method</Form.Label>
          <Form.Select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="">-- Select Payment Method --</option>
            <option value="MATIC">MATIC</option>
            <option value="ETH">ETH</option>
            <option value="USDT">USDT</option>
            <option value="Sepolia">Sepolia</option>
          </Form.Select>
        </Form.Group>
      </Row>
      <Col className="d-flex align-items-center justify-content-center">
        <Button variant="primary col-2 m-4" type="submit">
          Create Listing
        </Button>
      </Col>
    </Form>
  );
}