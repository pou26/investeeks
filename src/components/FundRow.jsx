import React, { useState } from 'react';
import { TrendingUp, Award, ChevronDown, ChevronUp, BarChart3, Shield, Target, Calendar, TrendingDown, Info, Move } from 'lucide-react';
import { mockFundsData, mockFundsDetailData } from '../utils/mockData';

// FundRow Component
const FundRow = ({ fund, index, onDragStart }) => {
  if (!fund) return null;

  // Get detailed data for the current fund
  const fundDetails = mockFundsDetailData.find(detail => detail.id === fund.id) || {};

  // Fallback data if detailed data is not found
  const defaultDetails = {
    nav: "₹ 410.42",
    navDate: "Jun 19",
    threeYearCAGR: fund.threeYearReturn || "N/A",
    expenseRatio: "N/A",
    fundManager: "N/A",
    fundType: "Direct Fund",
    details: {
      consistencyRating: "Good",
      fundSizeRating: "Good",
      description: `These are the ${fund.opinion.toLowerCase()} funds within ${fund.category.toLowerCase()} mutual funds.`,
      analysis: [
        {
          metric: "Performance",
          rating: "Good",
          description: `The fund has shown ${fund.opinion.toLowerCase()} performance in its category`
        },
        {
          metric: "Fund Size",
          rating: "Good",
          description: `The fund maintains good fund size with AUM of ${fund.aum}`
        }
      ]
    }
  };

  // Merge fund details with defaults
  const finalDetails = {
    ...defaultDetails,
    ...fundDetails,
    details: {
      ...defaultDetails.details,
      ...(fundDetails.details || {})
    }
  };

  // Mock recommended funds (you can make this dynamic too if needed)
  const recommendedFunds = [
    { name: "BHARAT Bond FOF - April 2031 Direct (G)", cagr: "9.4%", period: "3Y CAGR" },
    { name: "Parag Parikh Flexi Cap Fund Direct (G)", cagr: "25.9%", period: "3Y CAGR" },
    { name: "BHARAT Bond ETF FOF - April 2032", cagr: "9.5%", period: "3Y CAGR" }
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const getOpinionIcon = (opinion) => {
    if (opinion === 'Top Ranked') {
      return <TrendingUp className="w-4 h-4 text-emerald-600" />;
    }
    return <Award className="w-4 h-4 text-orange-500" />;
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'High': return 'text-orange-600 bg-orange-50';
      case 'Very High': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRatingColor = (rating) => {
    switch (rating) {
      case 'Category Leader': return 'w-5/6';
      case 'Good': return 'w-4/6';
      case 'Average': return 'w-3/6';
      default: return 'w-2/6';
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData('application/json', JSON.stringify(fund));
    e.dataTransfer.effectAllowed = 'copy';
    
    if (onDragStart) {
      onDragStart(fund);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className={`border-b border-gray-100 transition-all duration-200 ${isDragging ? 'opacity-50 scale-95' : ''}`}>
      <div 
        className={`grid grid-cols-7 gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        onClick={toggleDropdown}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex items-start space-x-2">
          <div className="flex items-center mt-1">
            {getOpinionIcon(fund.opinion)}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 text-sm leading-tight mb-1">
              {fund.name}
            </h3>
            <div className="text-xs text-gray-500 space-y-1">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(fund.riskLevel)}`}>
                  {fund.riskLevel} Risk
                </span>
              </div>
              <div>Min: {fund.minInvestment}</div>
            </div>
          </div>
        </div>
        <div className="text-center text-sm font-medium text-gray-900 flex items-center justify-center">
          {fund.aum}
        </div>
        <div className="text-center flex items-center justify-center">
          <span className={`text-sm font-medium ${parseFloat(fund.oneYearReturn) > 10 ? 'text-green-600' : 'text-gray-900'}`}>
            {fund.oneYearReturn}
          </span>
        </div>
        <div className="text-center flex items-center justify-center">
          <span className={`text-sm font-medium ${parseFloat(fund.threeYearReturn) > 15 ? 'text-green-600' : 'text-gray-900'}`}>
            {fund.threeYearReturn}
          </span>
        </div>
        <div className="text-center flex items-center justify-center">
          <span className={`text-sm font-medium ${parseFloat(fund.tillDateReturn) > 12 ? 'text-green-600' : 'text-gray-900'}`}>
            {fund.tillDateReturn}
          </span>
        </div>
        <div className="text-center flex items-center justify-center">
          <button 
            className="bg-orange-500 text-white text-xs px-3 py-1 rounded hover:bg-orange-600 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Invest Now
          </button>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Move className="w-4 h-4 text-gray-400" title="Drag to compare" />
          {isDropdownOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </div>

      {/* Dynamic Dropdown Content */}
      {isDropdownOpen && (
        <div className="bg-white border-t border-gray-200 p-6 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Fund Overview */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{fund.name}</h3>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-500">NAV ({finalDetails.navDate})</div>
                    <div className="text-lg font-semibold text-gray-900">{finalDetails.nav}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">3 Year CAGR</div>
                    <div className="text-lg font-semibold text-green-600">{finalDetails.threeYearCAGR}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-6">
                <span className="text-sm text-gray-600">{fund.category} • {fund.company}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  fund.opinion === 'Top Ranked' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {fund.opinion}
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium flex items-center space-x-1">
                  <Move className="w-3 h-3" />
                  <span>Draggable</span>
                </span>
              </div>

              {/* Fund Manager and Details */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <span className="text-gray-500">Fund Manager:</span>
                  <span className="ml-2 text-gray-900">{finalDetails.fundManager}</span>
                </div>
                <div>
                  <span className="text-gray-500">Expense Ratio:</span>
                  <span className="ml-2 text-gray-900">{finalDetails.expenseRatio}</span>
                </div>
                <div>
                  <span className="text-gray-500">Fund Type:</span>
                  <span className="ml-2 text-gray-900">{finalDetails.fundType}</span>
                </div>
                <div>
                  <span className="text-gray-500">AUM:</span>
                  <span className="ml-2 text-gray-900">{fund.aum}</span>
                </div>
              </div>

              {/* Analysis Section */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  {getOpinionIcon(fund.opinion)}
                  <h4 className="font-medium text-gray-900">{fund.opinion}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {finalDetails.details.description}
                </p>
                <div className="text-sm text-gray-700 mb-4">
                  Our analysis of this fund
                </div>
              </div>

              {/* Performance Metrics - Dynamic */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {finalDetails.details.analysis && finalDetails.details.analysis.map((analysis, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      {idx === 0 ? (
                        <Shield className="w-4 h-4 text-blue-600" />
                      ) : (
                        <BarChart3 className="w-4 h-4 text-blue-600" />
                      )}
                      <span className="text-sm font-medium text-gray-700">{analysis.metric}</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">{analysis.rating}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`bg-emerald-500 h-2 rounded-full ${getRatingColor(analysis.rating)}`}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      {analysis.description}
                    </p>
                  </div>
                ))}
              </div>

              <button className="text-blue-600 text-sm hover:underline flex items-center space-x-1">
                <span>View all analysis</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Investment Section */}
            <div>
              <button className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors mb-6">
                Invest in this fund
              </button>

              {/* Drag to Compare */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Move className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Compare This Fund</span>
                </div>
                <p className="text-xs text-blue-700">
                  Drag this fund to the comparison area above to compare with other funds.
                </p>
              </div>

              {/* Recommended Funds */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm font-medium text-gray-900">Scripbox Recommended {fund.category} Funds</span>
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded font-medium">
                    Recommended
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-4">
                  Want the {fund.category.toLowerCase()} funds that are right for your investment needs?
                </p>
                <button className="text-blue-600 text-xs hover:underline mb-4">
                  Learn more
                </button>

                <div className="space-y-3">
                  {recommendedFunds.map((recFund, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-900">{recFund.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">{recFund.cagr}</div>
                        <div className="text-xs text-gray-500">{recFund.period}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundRow;