import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip, LineChart, Line } from 'recharts';
import { X, TrendingUp, Award, ArrowUpDown, ChevronDown, ChevronUp, BarChart3, Shield, Target, Calendar, TrendingDown, Info, Move, Minimize2, Maximize2, Eye, EyeOff } from 'lucide-react';
import { mockFundsData, mockFundsDetailData } from '../utils/mockData';


// Improved Floating Comparison Panel
const FloatingComparisonPanel = ({ comparedFunds, setComparedFunds, isMinimized, setIsMinimized, isVisible, setIsVisible }) => {
  if (!isVisible) return null;

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e, slotIndex) => {
    e.preventDefault();
    try {
      const fundDataString = e.dataTransfer.getData('application/json');
      if (fundDataString) {
        const fundData = JSON.parse(fundDataString);
        const newComparedFunds = [...comparedFunds];
        newComparedFunds[slotIndex] = fundData;
        setComparedFunds(newComparedFunds);
        setIsVisible(true);
      }
    } catch (error) {
      console.error('Error parsing dropped fund data:', error);
    }
  };

  const removeFund = (index) => {
    const newComparedFunds = [...comparedFunds];
    newComparedFunds[index] = null;
    setComparedFunds(newComparedFunds);
    
    if (newComparedFunds.every(fund => fund === null)) {
      setIsVisible(false);
    }
  };
    const getAUMValue = (aum) => {
    return parseFloat(aum.replace(/[₹,Cr\s]/g, ''));
  };

  const getPerformanceValue = (performance) => {
    return parseFloat(performance.replace('%', ''));
  };

  const getComparisonData = () => {
    if (!comparedFunds[0] || !comparedFunds[1]) return [];
        return [
      {
        metric: 'AUM (₹ Cr)',
        fund1: getAUMValue(comparedFunds[0].aum),
        fund2: getAUMValue(comparedFunds[1].aum),
        fund1Name: comparedFunds[0].name.split(' ')[0],
        fund2Name: comparedFunds[1].name.split(' ')[0]
      },
      {
        metric: '1Y CAGR (%)',
        fund1: getPerformanceValue(comparedFunds[0].oneYearReturn),
        fund2: getPerformanceValue(comparedFunds[1].oneYearReturn),
        fund1Name: comparedFunds[0].name.split(' ')[0],
        fund2Name: comparedFunds[1].name.split(' ')[0]
      },
      {
        metric: '3Y CAGR (%)',
        fund1: getPerformanceValue(comparedFunds[0].threeYearReturn),
        fund2: getPerformanceValue(comparedFunds[1].threeYearReturn),
        fund1Name: comparedFunds[0].name.split(' ')[0],
        fund2Name: comparedFunds[1].name.split(' ')[0]
      }
    ];
  };
    const COLORS = ['#10B981', '#F59E0B'];

  // Auto-show when funds are added from parent
  React.useEffect(() => {
    if (comparedFunds[0] || comparedFunds[1]) {
      setIsVisible(true);
    }
  }, [comparedFunds]);

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md w-full shadow-2xl">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <h3 className="font-semibold">Fund Comparison</h3>
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                {comparedFunds.filter(f => f).length}/2
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white/80 hover:text-white transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {!isMinimized && (
          <div className="p-4">
            {/* Drop Zones */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[0, 1].map((slotIndex) => (
                <div
                  key={slotIndex}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, slotIndex)}
                  className={`border-2 border-dashed rounded-lg p-3 h-24 flex items-center justify-center transition-all duration-200 ${
                    comparedFunds[slotIndex] 
                      ? 'border-emerald-300 bg-emerald-50' 
                      : 'border-gray-300 bg-gray-50 hover:border-emerald-400 hover:bg-emerald-25'
                  }`}
                >
                  {comparedFunds[slotIndex] ? (
                    <div className="text-center w-full">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-900 truncate">
                          {comparedFunds[slotIndex].name.split(' ').slice(0, 2).join(' ')}
                        </span>
                        <button
                          onClick={() => removeFund(slotIndex)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div className="text-left">
                      <span className="font-medium">AUM:</span> {comparedFunds[slotIndex].aum}
                    </div>
                    <div className="text-left">
                      <span className="font-medium">1Y:</span> {comparedFunds[slotIndex].oneYearReturn}
                    </div>
                    <div className="text-left">
                      <span className="font-medium">3Y:</span> {comparedFunds[slotIndex].threeYearReturn}
                    </div>
                    <div className="text-left">
                      <span className="font-medium">Risk:</span> {comparedFunds[slotIndex].riskLevel}
                    </div>
                  </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      <ArrowUpDown className="w-6 h-6 mx-auto mb-1 text-gray-400" />
                      <p className="text-xs">Drop Here</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

 {/* Comparison Charts */}
        {isVisible && comparedFunds[0] && comparedFunds[1] && (
          <div className="border-t border-gray-200 pt-6 h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-6 h-1">

              <h4 className="text-lg font-semibold text-gray-900">Comparison Results</h4>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Performance Comparison Bar Chart */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="text-sm font-medium text-gray-900 mb-4">Performance Comparison</h5>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={getComparisonData()}>
                    <XAxis 
                      dataKey="metric" 
                      tick={{ fontSize: 10 }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip 
                      formatter={(value, name) => [
                        `${value}${name.includes('CAGR') ? '%' : ''}`,
                        name.includes('fund1') ? comparedFunds[0].name.split(' ')[0] : comparedFunds[1].name.split(' ')[0]
                      ]}
                    />
                    <Bar dataKey="fund1" fill="#10B981" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="fund2" fill="#F59E0B" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* AUM Distribution Pie Chart */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="text-sm font-medium text-gray-900 mb-4">AUM Distribution</h5>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={[
                        { 
                          name: comparedFunds[0].name.split(' ')[0], 
                          value: getAUMValue(comparedFunds[0].aum),
                          fullName: comparedFunds[0].name
                        },
                        { 
                          name: comparedFunds[1].name.split(' ')[0], 
                          value: getAUMValue(comparedFunds[1].aum),
                          fullName: comparedFunds[1].name
                        }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {getComparisonData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`₹ ${value} Cr`, 'AUM']}
                      labelFormatter={(label) => comparedFunds.find(f => f?.name?.includes(label))?.name || label}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center space-x-4 mt-2">
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                    <span>{comparedFunds[0].name.split(' ')[0]}</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                    <span>{comparedFunds[1].name.split(' ')[0]}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-gray-600 font-medium">Metric</th>
                    <th className="text-center py-3 text-gray-600 font-medium">{comparedFunds[0].name.split(' ')[0]}</th>
                    <th className="text-center py-3 text-gray-600 font-medium">{comparedFunds[1].name.split(' ')[0]}</th>
                    <th className="text-center py-3 text-gray-600 font-medium">Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { metric: 'AUM', key: 'aum', type: 'higher' },
                    { metric: '1Y CAGR', key: 'oneYearReturn', type: 'higher' },
                    { metric: '3Y CAGR', key: 'threeYearReturn', type: 'higher' },
                    { metric: 'Till Date CAGR', key: 'tillDateReturn', type: 'higher' },
                    { metric: 'Min Investment', key: 'minInvestment', type: 'lower' }
                  ].map((row) => {
                    const val1 = row.key === 'aum' ? getAUMValue(comparedFunds[0][row.key]) : 
                                row.key.includes('Return') ? getPerformanceValue(comparedFunds[0][row.key]) :
                                comparedFunds[0][row.key];
                    const val2 = row.key === 'aum' ? getAUMValue(comparedFunds[1][row.key]) : 
                                row.key.includes('Return') ? getPerformanceValue(comparedFunds[1][row.key]) :
                                comparedFunds[1][row.key];
                    
                    const winner = row.type === 'higher' ? 
                      (val1 > val2 ? comparedFunds[0].name.split(' ')[0] : comparedFunds[1].name.split(' ')[0]) :
                      (val1 < val2 ? comparedFunds[0].name.split(' ')[0] : comparedFunds[1].name.split(' ')[0]);

                    return (
                      <tr key={row.metric} className="border-b border-gray-100">
                        <td className="py-3 font-medium">{row.metric}</td>
                        <td className="text-center py-3">{comparedFunds[0][row.key]}</td>
                        <td className="text-center py-3">{comparedFunds[1][row.key]}</td>
                        <td className="text-center py-3">
                          <span className="text-emerald-600 font-medium">{winner}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

            {(!comparedFunds[0] && !comparedFunds[1]) && (
              <div className="text-center py-4">
                <Move className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Drag funds here to compare</p>
                <p className="text-xs text-gray-500">Start by dragging a fund from the list</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Fund Detail Dropdown Component
const FundDetailDropdown = ({ fund, isOpen }) => {
  if (!isOpen) return null;

  // Get detailed data for this fund
  const details = mockFundsDetailData[fund.id];
  if (!details) return <div className="p-4">No details available.</div>;

  return (
    <div className="bg-white border-t border-gray-200 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fund Overview */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{details.name}</h3>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">NAV ({details.navDate})</div>
                <div className="text-lg font-semibold text-gray-900">{details.nav}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">5 Year CAGR</div>
                <div className="text-lg font-semibold text-green-600">{details.fiveYearCAGR}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-sm text-gray-600">{details.category} • {details.company}</span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              details.opinion === 'Top Ranked' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-orange-100 text-orange-800'
            }`}>
              {details.opinion}
            </span>
          </div>
          {/* Scripbox Opinion */}
          <div className="mb-4">
            <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-semibold mr-2">
              {details.opinion}
            </span>
            <span className="text-gray-700">{details.opinionDescription}</span>
          </div>
          {/* Analysis Section */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {details.analysis && details.analysis.map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                <div className="font-semibold text-gray-900 mb-1">{item.metric}</div>
                <div className="text-xs text-gray-500 mb-2">{item.rating}</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: item.ratingBar }}></div>
                </div>
                <div className="text-xs text-gray-600">{item.description}</div>
              </div>
            ))}
          </div>
          <button className="text-blue-600 text-sm hover:underline flex items-center space-x-1">
            <span>View all analysis</span>
          </button>
        </div>
        {/* Investment & Recommended Funds */}
        <div>
          <button className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors mb-6">
            Invest in this fund
          </button>
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-sm font-medium text-gray-900">Scripbox Recommended {details.category} Funds</span>
              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded font-medium">
                Recommended
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-4">
              Want the {details.category.toLowerCase()} funds that are right for your investment needs?
            </p>
            <button className="text-blue-600 text-xs hover:underline mb-4">
              Learn more
            </button>
            <div className="space-y-3">
              {details.recommendedFunds && details.recommendedFunds.map((recFund, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">{recFund.name[0]}</span>
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
  );
};

// Fund Row Component with dropdown
const FundRow = ({ fund, index, onDragStart, isExpanded, onToggleExpand }) => {
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
    <div className={`border-b border-gray-100 transition-all duration-200 ${
      isDragging ? 'opacity-50 scale-95 bg-blue-50' : ''
    }`}>
      <div 
        className={`grid grid-cols-8 gap-4 p-4 hover:bg-gray-50 transition-colors ${
          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
        }`}
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
          <span className={`text-sm font-medium ${parseFloat(fund.oneYearReturn) > 20 ? 'text-green-600' : 'text-gray-900'}`}>
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
          <button className="bg-orange-500 text-white text-xs px-3 py-1 rounded hover:bg-orange-600 transition-colors">
            Invest Now
          </button>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-1 text-gray-400">
            <Move className="w-4 h-4" title="Drag to compare" />

            
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={() => onToggleExpand(fund.id)}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
            <span className="text-xs">Details</span>
          </button>
        </div>
      </div>
      {isExpanded && (
        <FundDetailDropdown fund={fund} isOpen={isExpanded} />
      )}
    </div>
  );
};

// Main Demo Component
const ImprovedFundComparison = () => {
  const [comparedFunds, setComparedFunds] = useState([null, null]);
  const [isFloatingVisible, setIsFloatingVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [expandedFund, setExpandedFund] = useState(null);

  const handleDragStart = (fund) => {
    if (!isFloatingVisible) {
      setIsFloatingVisible(true);
    }
  };

  const handleToggleExpand = (fundId) => {
    setExpandedFund(expandedFund === fundId ? null : fundId);
  };

  useEffect(() => {
    if (comparedFunds[0] || comparedFunds[1]) {
      setIsFloatingVisible(true);
    }
  }, [comparedFunds]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Mutual Funds</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFloatingVisible(!isFloatingVisible)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                {isFloatingVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{isFloatingVisible ? 'Hide' : 'Show'} Comparison</span>
              </button>
            </div>
          </div>
          <p className="text-gray-600 mt-2">Click on "Details" to expand fund information or drag funds to compare!</p>
        </div>
      </div>

      {/* Funds Table */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Table Header */}
          <div className="grid grid-cols-8 gap-4 p-4 bg-gray-50 border-b font-medium text-sm text-gray-700">
            <div>Fund Name</div>
            <div className="text-center">AUM</div>
            <div className="text-center">1Y Return</div>
            <div className="text-center">3Y Return</div>
            <div className="text-center">Till Date</div>
            <div className="text-center">Action</div>
            <div className="text-center">Compare</div>
            <div className="text-center">Details</div>
          </div>

          {/* Fund Rows */}
          {mockFundsData.map((fund, index) => (
            <FundRow
              key={fund.id}
              fund={fund}
              index={index}
              onDragStart={handleDragStart}
              isExpanded={expandedFund === fund.id}
              onToggleExpand={handleToggleExpand}
            />
          ))}
        </div>
      </div>

      {/* Floating Comparison Panel */}
      <FloatingComparisonPanel
        comparedFunds={comparedFunds}
        setComparedFunds={setComparedFunds}
        isMinimized={isMinimized}
        setIsMinimized={setIsMinimized}
        isVisible={isFloatingVisible}
        setIsVisible={setIsFloatingVisible}
      />
      
    </div>
  );
};

export default ImprovedFundComparison;