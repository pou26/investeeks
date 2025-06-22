//Main Component
import React, { useState, useEffect } from 'react';
import { mockFundsData } from '../utils/mockData';
import Header from './Header';
import Breadcrumb from './Breadcrumb';
import PageHeader from './PageHeader';
import FiltersSidebar from './FiltersSidebar';
import MainContent from './MainContent';
import FundComparisonCard from './FundComparisonCard';

const ScripboxLanding = () => {
  const [funds, setFunds] = useState([]);
  const [filteredFunds, setFilteredFunds] = useState([]);
  const [filters, setFilters] = useState({
    opinion: 'Top Ranked',
    category: 'All',
    fundType: 'Direct Funds'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const fundsPerPage = 10;
  

useEffect(() => {

  setFunds(mockFundsData);
  setFilteredFunds(mockFundsData);
}, []);

  useEffect(() => {
    let filtered = funds;

    if (filters.opinion !== 'All') {
      filtered = filtered.filter(fund => fund.opinion === filters.opinion);
    }

    if (filters.category !== 'All') {
      filtered = filtered.filter(fund => fund.category === filters.category);
    }

    setFilteredFunds(filtered);
    setCurrentPage(1);
  }, [filters, funds]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastFund = currentPage * fundsPerPage;
  const indexOfFirstFund = indexOfLastFund - fundsPerPage;
  const currentFunds = filteredFunds.slice(indexOfFirstFund, indexOfLastFund);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader />

        <div className="flex gap-8">
          <FiltersSidebar 
            filters={filters} 
            onFilterChange={handleFilterChange} 
          />
          
          <MainContent
            filteredFunds={filteredFunds}
            currentFunds={currentFunds}
            filters={filters}
            onFilterChange={handleFilterChange}
            currentPage={currentPage}
            fundsPerPage={fundsPerPage}
            onPageChange={handlePageChange}
          />
          <FundComparisonCard/>
        </div>
      </div>
    </div>
  );
};

export default ScripboxLanding;