import React from 'react';

const FarmingAdvice = ({ advice }) => {
  return (
    <div className="mb-8 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
      <h3 className="text-2xl font-bold text-green-700 mb-2 text-center">Today's Farming Tip</h3>
      <p className="text-green-800 text-center text-xl">{advice}</p>
    </div>
  );
};

export default FarmingAdvice;