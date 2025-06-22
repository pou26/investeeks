import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip, LineChart, Line } from 'recharts';
import { X, TrendingUp, Award, ArrowUpDown, ChevronDown, ChevronUp, BarChart3, Shield, Target, Calendar, TrendingDown, Info, Move, Minimize2, Maximize2, Eye, EyeOff } from 'lucide-react';
// Detailed Comparison Modal Component
const DetailedComparisonModal = ({ comparedFunds, isOpen, onClose }) => {
  if (!isOpen || !comparedFunds[0] || !comparedFunds[1]) return null;

  const fund1 = comparedFunds[0];
  const fund2 = comparedFunds[1];

  // Prepare performance comparison data
  const performanceComparison = fund1.performanceHistory.map((item, index) => ({
    period: item.period,
    fund1: parseFloat(item.return.replace('%', '')),
    fund2: parseFloat(fund2.performanceHistory[index].return.replace('%', ''))
  }));

  // NAV comparison (mock data for visualization)
  const navComparison = [
    { month: 'Jan', fund1: 380, fund2: 260 },
    { month: 'Feb', fund1: 385, fund2: 265 },
    { month: 'Mar', fund1: 390, fund2: 270 },
    { month: 'Apr', fund1: 400, fund2: 275 },
    { month: 'May', fund1: 410, fund2: 285 },
    { month: 'Jun', fund1: 414, fund2: 287 }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Detailed Fund Comparison</h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="mt-2 text-sm opacity-90">
            Comprehensive analysis of your selected funds
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Fund Names Header */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h3 className="font-semibold text-emerald-800 text-lg">{fund1.name}</h3>
              <p className="text-emerald-600 text-sm mt-1">{fund1.category} • {fund1.riskLevel} Risk</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <h3 className="font-semibold text-amber-800 text-lg">{fund2.name}</h3>
              <p className="text-amber-600 text-sm mt-1">{fund2.category} • {fund2.riskLevel} Risk</p>
            </div>
          </div>

          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Returns Comparison Bar Chart */}
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                Returns Comparison
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceComparison}>
                    <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      formatter={(value, name) => [`${value}%`, name === 'fund1' ? fund1.name.split(' ')[0] : fund2.name.split(' ')[0]]}
                      contentStyle={{ 
                        backgroundColor: '#f9fafb', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="fund1" fill="#10b981" name="fund1" />
                    <Bar dataKey="fund2" fill="#f59e0b" name="fund2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* NAV Trend Line Chart */}
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                NAV Trend (6 Months)
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={navComparison}>
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      formatter={(value, name) => [`₹${value}`, name === 'fund1' ? fund1.name.split(' ')[0] : fund2.name.split(' ')[0]]}
                      contentStyle={{ 
                        backgroundColor: '#f9fafb', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="fund1" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                      name="fund1"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="fund2" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                      name="fund2"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Detailed Comparison Table */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <h4 className="font-semibold text-gray-900 p-4 bg-gray-50 border-b flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-600" />
              Detailed Metrics Comparison
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Metric</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-emerald-800">{fund1.name.split(' ')[0]}</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-amber-800">{fund2.name.split(' ')[0]}</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Winner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { label: 'AUM', key: 'aum', fund1: fund1.aum, fund2: fund2.aum },
                    { label: '1 Year Return', key: 'oneYearReturn', fund1: fund1.oneYearReturn, fund2: fund2.oneYearReturn },
                    { label: '3 Year Return', key: 'threeYearReturn', fund1: fund1.threeYearReturn, fund2: fund2.threeYearReturn },
                    { label: '5 Year CAGR', key: 'fiveYearCAGR', fund1: fund1.fiveYearCAGR, fund2: fund2.fiveYearCAGR },
                    { label: 'Expense Ratio', key: 'expenseRatio', fund1: fund1.expenseRatio, fund2: fund2.expenseRatio },
                    { label: 'Min Investment', key: 'minInvestment', fund1: fund1.minInvestment, fund2: fund2.minInvestment },
                    { label: 'NAV', key: 'nav', fund1: fund1.nav, fund2: fund2.nav },
                    { label: 'Risk Level', key: 'riskLevel', fund1: fund1.riskLevel, fund2: fund2.riskLevel },
                    { label: 'Fund Manager', key: 'fundManager', fund1: fund1.fundManager, fund2: fund2.fundManager }
                  ].map((row, index) => {
                    const getWinner = (key) => {
                      if (key === 'oneYearReturn' || key === 'threeYearReturn' || key === 'fiveYearCAGR') {
                        return parseFloat(fund1[key]) > parseFloat(fund2[key]) ? 'Fund 1' : 'Fund 2';
                      }
                      if (key === 'expenseRatio') {
                        return parseFloat(fund1[key]) < parseFloat(fund2[key]) ? 'Fund 1' : 'Fund 2';
                      }
                      return '-';
                    };

                    return (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.label}</td>
                        <td className="px-4 py-3 text-sm text-center text-emerald-700 font-medium">{row.fund1}</td>
                        <td className="px-4 py-3 text-sm text-center text-amber-700 font-medium">{row.fund2}</td>
                        <td className="px-4 py-3 text-sm text-center">
                          {getWinner(row.key) !== '-' && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              getWinner(row.key) === 'Fund 1' 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {getWinner(row.key)}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedComparisonModal;