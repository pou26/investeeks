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

        

      </div>
    </div>
  );
};

export default FundComparisonWrapper;