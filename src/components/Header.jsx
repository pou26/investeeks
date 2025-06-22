
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">scripbox</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">Mutual Funds</a>
              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">Research</a>
              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">Financial Planning</a>
              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">Fee</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-orange-500 font-medium">Login</button>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 font-medium">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;