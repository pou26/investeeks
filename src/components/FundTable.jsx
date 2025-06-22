
import React from 'react';
import FundRow from './FundRow';

const FundTable = ({ funds }) => {
  return (
    <div className="bg-white border border-gray-200">
      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 font-medium text-sm text-gray-700 border-b">
        <div>Fund name</div>
        <div className="text-center">AUM</div>
        <div className="text-center">1Y CAGR</div>
        <div className="text-center">3Y CAGR</div>
        <div className="text-center">Till Date CAGR</div>
        <div className="text-center">Actions</div>
      </div>

      {/* Fund List */}
      <div>
        {funds.map((fund, index) => (
          <FundRow key={fund.id} fund={fund} index={index} />
        ))}
      </div>
    </div>
  );
};

export default FundTable;