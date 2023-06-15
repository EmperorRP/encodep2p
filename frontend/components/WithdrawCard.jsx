// components/ListingCard.jsx

import React from "react";
import "tailwindcss/tailwind.css"; // import tailwind css
import { useSigner } from "wagmi";

export default function WithdrawCard({ listing }) {
  const{ data: signer} = useSigner();
  const onWithdraw = (e) => {
    e.preventDefault();

    const request = {
      "sellOrderID": listing.requestId,
      "address": signer._address,
    };

    if(confirm("Are you sure you want to withdraw your sell order?") != true){
      return;
  }
 
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(request),
    };
    fetch("http://localhost:3001/withdraw",requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        prompt("Sell order withdrawn \nTransaction status - "+data.status+".\nTxn link - ",data.data);
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
        <button type="button" className="btn btn-primary" onClick={onWithdraw}>Withdraw</button>
      </td>
    </tr>
  );
}
