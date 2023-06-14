// components/ListingCard.jsx

import React from "react";
import "tailwindcss/tailwind.css"; // import tailwind css

export default function ListingCard({ listing }) {
  return (
    <tr className="border-b border-gray-200">
      {" "}
      {/* added tailwind classes for border */}
      <td className="px-4 py-2">{listing.id}</td>
      <td className="px-4 py-2">{listing.seller}</td>
      <td className="px-4 py-2">{listing.crypto}</td>
      <td className="px-4 py-2">{listing.price}</td>
      <td className="px-4 py-2">{listing.minMaxOrder}</td>
      <td className="px-4 py-2">{listing.paymentMethod}</td>
    </tr>
  );
}
