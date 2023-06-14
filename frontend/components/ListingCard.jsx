// components/ListingCard.jsx

import React from "react";
import "tailwindcss/tailwind.css"; // import tailwind css

export default function ListingCard({ listing }) {

  const onclick = (e) => {
    e.preventDefault();

    const request = {
      "address": listing.address,
      "sellOrderID": listing.requestId,
      "tokenId": listing.token,
      "amount": listing.amount,
    };

    alert(JSON.stringify(request));

    fetch("http://localhost:5001/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listing),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <tr className="border-b border-gray-200" key={listing.requestId}>
      <td className="px-4 py-2">{listing.token}</td>
      <td className="px-4 py-2">{listing.amount}</td>
      <td className="px-4 py-2">{listing.exchangeToken}</td>
      <td className="px-4 py-2">{listing.unitAmount}</td>
      <td className="px-4 py-2">{listing.address}</td>
      <td className="px-4 py-2">{listing.requestId}</td>
      <td>
        <button type="button" className="btn btn-primary"><i className="check icon" onClick={onclick}></i>Buy</button>
      </td>
    </tr>
  );
}
