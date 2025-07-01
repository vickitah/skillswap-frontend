import React from 'react';
import ExchangeItem from './ExchangeItem';

const ExchangeList = ({ exchanges = [] }) => {
  if (exchanges.length === 0) {
    return <p>No exchanges found.</p>;
  }

  return (
    <div className="space-y-4">
      {exchanges.map((exchange) => (
        <ExchangeItem key={exchange.id || exchange.name} exchange={exchange} />  
      ))}
    </div>
  );
};

export default ExchangeList;
