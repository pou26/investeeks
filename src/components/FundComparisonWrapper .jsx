import React, { useState } from 'react';
import FundRow from './FundRow';
import FundComparisonCard from './FundComparisonCard';
import {mockFundsData} from '../utils/mockData';

const FundComparisonWrapper = () => {
  const [comparedFunds, setComparedFunds] = useState([null, null]);

  const handleDragStart = (fund) => {
    // No localStorage needed - data is now handled directly in the drag event
    // The FundRow component will handle setting the dataTransfer data
    console.log('Drag started for fund:', fund.name);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Comparison Card */}
      <FundComparisonCard
        comparedFunds={comparedFunds}
        setComparedFunds={setComparedFunds}
      />
      
      {/* Fund List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Available Funds</h2>
          <p className="text-sm text-gray-600 mt-1">
            Drag any fund to the comparison area above to compare performance
          </p>
        </div>
        
        {/* Fund List Header */}
        <div className="grid grid-cols-7 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div>Fund Name</div>
          <div className="text-center">AUM</div>
          <div className="text-center">1Y CAGR</div>
          <div className="text-center">3Y CAGR</div>
          <div className="text-center">Till Date</div>
          <div className="text-center">Action</div>
          <div className="text-center">Details</div>
        </div>
        
        {/* Fund Rows */}
        <div>
          {mockFundsData.map((fund, index) => (
            <FundRow
              key={fund.id}
              fund={fund}
              index={index}
              onDragStart={handleDragStart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FundComparisonWrapper;