import { useState } from "react";
import ListingCard from "../components/ListingCard";
import NewListingForm from "../components/NewListingForm";
import Table from "react-bootstrap/Table";

export default function Listings() {
  const [listings, setListings] = useState([
    {
      id: 1,
      seller: "Alice",
      crypto: "ETH",
      price: "2000",
      minMaxOrder: "1-5",
      paymentMethod: "MATIC",
    },
    {
      id: 2,
      seller: "Bob",
      crypto: "BTC",
      price: "50000",
      minMaxOrder: "1-3",
      paymentMethod: "MATIC",
    },
  ]);

  return (
    <div className="text-white p-6 bg-dark">
      <h1 className="text-4xl mb-4">Listings</h1>
      <Table striped bordered className="table-dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Seller</th>
            <th>Crypto</th>
            <th>Price</th>
            <th>Order Range</th>
            <th>Payment Method</th>
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
