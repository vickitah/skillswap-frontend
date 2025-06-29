// src/components/ExchangeItem.jsx
import React from 'react';

const ExchangeItem = ({ exchange }) => {
  return (
    <div className="border rounded-md p-4 bg-gray-50 shadow-sm">
      <div className="font-semibold">Exchange with {exchange.partner}</div>
      <p className="text-sm">Teaching: {exchange.teaching}</p>
      <p className="text-sm">Learning: {exchange.learning}</p>
      <p className="text-sm text-gray-500">
        Next session: {exchange.next_session}
      </p>
      <div className="text-sm text-blue-600 font-medium mt-1">{exchange.status}</div>
      <div className="mt-2 flex gap-2">
        <button className="px-3 py-1 bg-blue-600 text-white rounded">Message</button>
        <button className="px-3 py-1 border rounded">Schedule</button>
      </div>
    </div>
  );
};

export default ExchangeItem;
