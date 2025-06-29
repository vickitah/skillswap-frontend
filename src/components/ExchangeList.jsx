// src/components/ExchangeList.jsx
import React from 'react';
import ExchangeItem from './ExchangeItem';

const ExchangeList = ({ exchanges }) => {
  return (
    <div className="space-y-4">
      {exchanges.map((ex, idx) => (
        <ExchangeItem key={idx} exchange={ex} />
      ))}
    </div>
  );
};

export default ExchangeList;
