import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Tooltip } from 'recharts';
import { X, TrendingUp, Award, ArrowUpDown, ChevronDown, ChevronUp, BarChart3, Shield, Target, Calendar, TrendingDown, Info, Move } from 'lucide-react';

// FundComparisonCard Component
const FundComparisonCard = ({ comparedFunds, setComparedFunds }) => {
  const [isVisible, setIsVisible] = useState(false);
    if (!Array.isArray(comparedFunds)) return null;

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

const handleDrop = (e, slotIndex) => {
  e.preventDefault();
  try {
    const fundData = JSON.parse(localStorage.getItem('draggedFund'));
    if (fundData) {
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
    
    // Hide card if both slots are empty
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
    <div className="w-full mb-6">
      {/* Drop Zones */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Compare Funds</h3>
        <p className="text-sm text-gray-600 mb-6">Drag funds from the list below to compare their performance</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[0, 1].map((slotIndex) => (
            <div
              key={slotIndex}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, slotIndex)}
              className={`border-2 border-dashed rounded-lg p-6 min-h-[140px] flex items-center justify-center transition-all duration-200 ${
                comparedFunds[slotIndex] 
                  ? 'border-emerald-300 bg-emerald-50' 
                  : 'border-gray-300 bg-gray-50 hover:border-emerald-400 hover:bg-emerald-25'
              }`}
            >
              {comparedFunds[slotIndex] ? (
                <div className="text-center w-full">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-900 flex-1 text-left">
                      {comparedFunds[slotIndex].name}
                    </h4>
                    <button
                      onClick={() => removeFund(slotIndex)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
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
                  <ArrowUpDown className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                  <p className="text-sm font-medium">Drop Fund Here</p>
                  <p className="text-xs text-gray-400">Slot {slotIndex + 1}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Comparison Charts */}
        {isVisible && comparedFunds[0] && comparedFunds[1] && (
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-6">
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
      </div>
    </div>
  );
};

export default FundComparisonCard;