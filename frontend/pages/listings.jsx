// pages/listings.jsx
import { useState } from "react";
import ListingCard from "../components/ListingCard";
import NewListingForm from "../components/NewListingForm";
import "tailwindcss/tailwind.css"; // import tailwind css

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

  const handleCreateListing = (newListing) => {
    setListings((prevListings) => [
      ...prevListings,
      { ...newListing, id: prevListings.length + 1 },
    ]);
  };

  return (
    <div className="text-white p-6">
      <h1 className="text-4xl mb-4">Listings</h1>
      <NewListingForm onCreateListing={handleCreateListing} />
      <table className="w-full text-left table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Seller</th>
            <th className="px-4 py-2">Crypto</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Order Range</th>
            <th className="px-4 py-2">Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
