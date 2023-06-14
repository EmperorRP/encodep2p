import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { AccountContext } from '../pages/_app';
import { useContext } from 'react';

export default function NewListingForm() {
  const [tokenToBuy, setTokenToBuy] = useState("");
  const [amountToBuy, setAmountToBuy] = useState("");
  const [tokenToSell, setTokenToSell] = useState("");
  const [amountToSell, setAmountToSell] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const account = useContext(AccountContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      "address": account.address,
      "token": tokenToBuy,
      "amount": amountToBuy,
      "exchangeToken": tokenToSell,
      "unitAmount": amountToSell,
    };

    alert(JSON.stringify(formData));

    fetch('localhost::5001/postListing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response
        console.log(data);
        setTransactionHash(data.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Form onSubmit={handleSubmit} className='bg-dark'>
      <Col className="d-flex align-items-center justify-content-center">
        <h1 className="text-4xl mb-4">Post new listing</h1>
      </Col>
      <Row className="mb-3">
        <Form.Group as={Col} md={6}>
          <Form.Label className="d-flex align-items-center justify-content-center">Token to buy</Form.Label>
          <Form.Select
            value={tokenToBuy}
            onChange={(e) => setTokenToBuy(e.target.value)}
            required
          >
            <option value="">-- Select token to buy --</option>
            <option value="MATIC">MATIC</option>
            <option value="ETH">ETH</option>
            <option value="USDT">USDT</option>
            <option value="Sepolia">Sepolia</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md={6}>
          <Form.Label className="d-flex align-items-center justify-content-center">Token to sell</Form.Label>
          <Form.Select
            value={tokenToSell}
            onChange={(e) => setTokenToSell(e.target.value)}
            required
          >
            <option value="">-- Select token to sell --</option>
            <option value="MATIC">MATIC</option>
            <option value="ETH">ETH</option>
            <option value="USDT">USDT</option>
            <option value="Sepolia">Sepolia</option>
          </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md={6}>
          <Form.Label className="d-flex align-items-center justify-content-center">Amount to buy</Form.Label>
          <Form.Control
            type="number"
            value={amountToSell}
            onChange={(e) => setAmountToSell(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md={6}>
          <Form.Label className="d-flex align-items-center justify-content-center">Amount to buy</Form.Label>
          <Form.Control
            type="number"
            value={amountToBuy}
            onChange={(e) => setAmountToBuy(e.target.value)}
            required
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">

      </Row>
      <Col className="d-flex align-items-center justify-content-center">
        <Button variant="primary col-2 m-4" type="submit" onSubmit={handleSubmit}>
          Create Listing
        </Button>
      </Col>
    </Form>
  );
}