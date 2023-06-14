// components/ListingCard.jsx

import React from "react";
import "tailwindcss/tailwind.css"; // import tailwind css
import { useSigner } from "wagmi";

export default function ListingCard({ listing }) {
  const{ data: signer} = useSigner();
  const onBuy = (e) => {
    e.preventDefault();

    const request = {
      "address": signer._address,
      "sellOrderID": listing.requestId,
      "tokenId": listing.exchangeToken,
      "amount": listing.amount*listing.unitAmount,
    };

    alert(JSON.stringify(request));
 
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(request),
    };
    fetch("http://localhost:3001/processBuyOrder",requestOptions)
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
        <button type="button" className="btn btn-primary" onClick={onBuy}>Buy</button>
      </td>
    </tr>
  );
}
