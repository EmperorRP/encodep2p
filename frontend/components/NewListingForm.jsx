// components/NewListingForm.jsx
import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <label>
        Seller
        <input
          type="text"
          value={seller}
          onChange={(e) => setSeller(e.target.value)}
          required
        />
      </label>
      <label>
        Crypto
        <select
          value={crypto}
          onChange={(e) => setCrypto(e.target.value)}
          required
        >
          <option value="">-- Select Crypto --</option>
          <option value="MATIC">MATIC</option>
          <option value="ETH">ETH</option>
          <option value="USDT">USDT</option>
          <option value="Sepolia">Sepolia</option>
        </select>
      </label>
      <label>
        Price
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <label>
        Min order
        <input
          type="number"
          value={minOrder}
          onChange={(e) => setMinOrder(e.target.value)}
          required
        />
      </label>
      <label>
        Max order
        <input
          type="number"
          value={maxOrder}
          onChange={(e) => setMaxOrder(e.target.value)}
          required
        />
      </label>
      {/* <label>
        Price in USD
        <input
          type="number"
          value={priceInUSD}
          onChange={(e) => setPriceInUSD(e.target.value)}
          required
        />
      </label> */}
      <label>
        Payment Method
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
        >
          <option value="">-- Select Payment Method --</option>
          <option value="MATIC">MATIC</option>
          <option value="ETH">ETH</option>
          <option value="USDT">USDT</option>
          <option value="Sepolia">Sepolia</option>
        </select>
      </label>
      <button type="submit">Create Listing</button>
    </form>
  );
}
