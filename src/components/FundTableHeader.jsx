
import React from 'react';

const FundTableHeader = ({ 
  indexOfFirstFund, 
  indexOfLastFund, 
  totalFunds, 
  filters, 
  onFilterChange 
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstFund + 1} to {Math.min(indexOfLastFund, totalFunds)} of {totalFunds} funds
        </div>
        <select 
          className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          value={filters.fundType}
          onChange={(e) => onFilterChange('fundType', e.target.value)}
        >
          <option>Direct Funds</option>
          <option>Regular Funds</option>
        </select>
      </div>
    </div>
  );
};

export default FundTableHeader;