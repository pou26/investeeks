import React, { useState } from 'react';
import FundRow from './FundRow';
import FundComparisonCard from './FundComparisonCard';

const FundComparisonWrapper = () => {
  const [comparedFunds, setComparedFunds] = useState([null, null]);

  const handleDragStart = (fund) => {
    // Store the fund as text so drop zones can read it
    localStorage.setItem('draggedFund', JSON.stringify(fund));
  };

  return (
    <div className="grid grid-cols-1  gap-6 p-6">
      {/* Left: Fund List */}
      <div>
        <FundRow onDragStart={handleDragStart} />
      </div>

      {/* Right: Comparison Card */}
      <div>
        <FundComparisonCard
          comparedFunds={comparedFunds}
          setComparedFunds={setComparedFunds}
        />
      </div>
    </div>
  );
};

export default FundComparisonWrapper;
