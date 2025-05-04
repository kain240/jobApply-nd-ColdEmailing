import React from 'react';

const StatCard = ({ title, value, icon, change, isPositive = true }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-2xl font-semibold mt-1">{value}</p>
                </div>
                <div className={`p-3 rounded-full ${isPositive ? 'bg-green-100' : 'bg-blue-100'}`}>
                    {icon}
                </div>
            </div>

            {change && (
                <div className="mt-2 flex items-center">
          <span className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : '-'}{change}%
          </span>
                    <span className="text-xs text-gray-500 ml-2">from last month</span>
                </div>
            )}
        </div>
    );
};

export default StatCard;