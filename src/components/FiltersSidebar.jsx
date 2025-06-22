// FiltersSidebar.js
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { fundHouses } from '../utils/mockData';

const FiltersSidebar = ({ filters, onFilterChange }) => {
  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };
    const [minInvestment, setMinInvestment] = useState(500);
  const [showAllFundHouses, setShowAllFundHouses] = useState(false);
  const [selectedFundHouses, setSelectedFundHouses] = useState([]);

  const handleSliderChange = (e) => {
    setMinInvestment(parseInt(e.target.value));
  };

  const toggleFundHouse = (fundHouse) => {
    setSelectedFundHouses(prev => 
      prev.includes(fundHouse) 
        ? prev.filter(fh => fh !== fundHouse)
        : [...prev, fundHouse]
    );
  };

  const getSliderBackground = () => {
    const percentage = ((minInvestment - 500) / (10000 - 500)) * 100;
    return `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;
  };

  return (
    <div className="w-64 flex-shrink-0">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <button className="text-sm text-gray-500 hover:text-gray-700">
            Reset Filters 2
          </button>
        </div>

        {/* Scripbox Opinion */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Scripbox Opinion</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                checked={filters.opinion === 'Recommended'}
                onChange={(e) => handleFilterChange('opinion', e.target.checked ? 'Recommended' : 'All')}
              />
              <span className="ml-2 text-sm text-gray-700">📋 Recommended</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                checked={filters.opinion === 'Top Ranked'}
                onChange={(e) => handleFilterChange('opinion', e.target.checked ? 'Top Ranked' : 'All')}
              />
              <span className="ml-2 text-sm text-gray-700">🎯 Top Ranked</span>
            </label>
          </div>
        </div>

        {/* Fund Category */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Fund Category</h4>
          <div className="space-y-2">
            {['Equity', 'Debt', 'Hybrid', 'International Equity', 'Solution Oriented'].map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  checked={filters.category === category}
                  onChange={(e) => handleFilterChange('category', e.target.checked ? category : 'All')}
                />
                <span className="ml-2 text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
          
        </div>
        
      </div>
      
      {/* Minimum Investment */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">Minimum Investment</h3>
          <span className="text-sm font-medium text-blue-600">₹{minInvestment}+</span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="500"
            max="10000"
            step="500"
            value={minInvestment}
            onChange={handleSliderChange}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{ background: getSliderBackground() }}
          />
          <style jsx>{`
            input[type="range"]::-webkit-slider-thumb {
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #3b82f6;
              cursor: pointer;
              border: 2px solid white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }
            input[type="range"]::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #3b82f6;
              cursor: pointer;
              border: 2px solid white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }
          `}</style>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>₹500</span>
          <span>₹10,000</span>
        </div>
      </div>

      {/* Fund House */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Fund House</h3>
        <div className="space-y-2">
          {fundHouses.slice(0, 4).map((fundHouse) => (
            <label key={fundHouse} className="flex items-center">
              <input 
                type="checkbox" 
                className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                checked={selectedFundHouses.includes(fundHouse)}
                onChange={() => toggleFundHouse(fundHouse)}
              />
              <span className="ml-2 text-sm text-gray-700">{fundHouse}</span>
            </label>
          ))}
        </div>
        
        {/* Show All Fund Houses */}
        <div className="mt-3">
          <button
            onClick={() => setShowAllFundHouses(!showAllFundHouses)}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <Plus className="w-4 h-4 mr-1" />
            See 48 other fund houses
            {showAllFundHouses ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
          </button>
          
          {showAllFundHouses && (
            <div className="mt-3 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
              <div className="space-y-2">
                {fundHouses.slice(4).map((fundHouse) => (
                  <label key={fundHouse} className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                      checked={selectedFundHouses.includes(fundHouse)}
                      onChange={() => toggleFundHouse(fundHouse)}
                    />
                    <span className="ml-2 text-sm text-gray-700">{fundHouse}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FiltersSidebar;