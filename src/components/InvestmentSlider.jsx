import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { fundHouses } from '../utils/mockData';



export default function InvestmentSlider() {
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
    <div className="w-80 bg-white border-r border-gray-200 p-6 h-screen overflow-y-auto">


      {/* Selected Filters Summary */}
      {selectedFundHouses.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Selected Fund Houses ({selectedFundHouses.length})</h4>
          <div className="flex flex-wrap gap-1">
            {selectedFundHouses.slice(0, 3).map((fundHouse) => (
              <span key={fundHouse} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {fundHouse.split(' ')[0]}
              </span>
            ))}
            {selectedFundHouses.length > 3 && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                +{selectedFundHouses.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}