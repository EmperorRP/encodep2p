import { useState, useEffect } from "react";
import ListingCard from "../components/ListingCard";
import NewListingForm from "../components/NewListingForm";
import Table from "react-bootstrap/Table";

export default function Listings() {
  const [listings, setListings] = useState([
    {
      "token": "$USDC",
      "address": "0x3e815f3dBfE293BDFE3861A15B57d7f5538dB630",
      "amount": 250,
      "requestId": 0,
      "exchangeToken": "INR",
      "unitAmount": 90
    },
    {
      "token": "Btc",
      "address": "0x0d1f2b79ac251295c72b1fD9D141CA41D4F78D49",
      "amount": 12,
      "requestId": 2,
      "exchangeToken": "Usd",
      "unitAmount": 5
    }
  ]);

  useEffect(() => {
    fetch("http://localhost:5001/listings")
      .then((response) => response.json())
      .then((data) => {
        setListings(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="text-white p-6 bg-dark">
      <h1 className="text-4xl mb-4">Listings</h1>
      <Table striped bordered className="table-dark">
        <thead>
          <tr>
            <th>Token to buy</th>
            <th>Amount to buy</th>
            <th>Token to sell</th>
            <th>Amount to sell</th>
            <th>Address</th>
            <th>Request ID</th>
            <th>Trade</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}
