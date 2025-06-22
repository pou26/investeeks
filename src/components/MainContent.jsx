
import React from 'react';
import FundTableHeader from './FundTableHeader';
import FundTable from './FundTable';
import Pagination from './Pagination';

const MainContent = ({ 
  filteredFunds,
  currentFunds,
  filters,
  onFilterChange,
  currentPage,
  fundsPerPage,
  onPageChange
}) => {
  const indexOfLastFund = currentPage * fundsPerPage;
  const indexOfFirstFund = indexOfLastFund - fundsPerPage;
  const totalPages = Math.ceil(filteredFunds.length / fundsPerPage);

  return (
    <div className="flex-1">
      <FundTableHeader
        indexOfFirstFund={indexOfFirstFund}
        indexOfLastFund={indexOfLastFund}
        totalFunds={filteredFunds.length}
        filters={filters}
        onFilterChange={onFilterChange}
      />

      <FundTable funds={currentFunds} enableDropdown={true} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default MainContent;