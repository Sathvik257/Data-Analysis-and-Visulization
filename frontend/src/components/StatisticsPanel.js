import React from 'react';
import { TrendingUp, BarChart3, Calculator, Activity } from 'lucide-react';

const StatisticsPanel = ({ stats }) => {
  if (!stats || stats.error) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">No statistics available. Please upload data first.</div>
      </div>
    );
  }

  const { basic_stats, additional_stats, numeric_columns } = stats;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card-hover bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Calculator className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{numeric_columns.length}</p>
              <p className="text-gray-600">Numeric Columns</p>
            </div>
          </div>
        </div>

        <div className="card-hover bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {numeric_columns.length > 0 ? Object.keys(basic_stats).length : 0}
              </p>
              <p className="text-gray-600">Statistics Calculated</p>
            </div>
          </div>
        </div>

        <div className="card-hover bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {numeric_columns.length > 0 ? 
                  Object.values(additional_stats).filter(col => col.mean !== null).length : 0
                }
              </p>
              <p className="text-gray-600">Means Calculated</p>
            </div>
          </div>
        </div>

        <div className="card-hover bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-orange-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {numeric_columns.length > 0 ? 
                  Object.values(additional_stats).filter(col => col.std !== null).length : 0
                }
              </p>
              <p className="text-gray-600">Standard Deviations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Statistics */}
      {numeric_columns.length > 0 && (
        <div className="space-y-6">
          {numeric_columns.map((column) => {
            const basic = basic_stats[column];
            const additional = additional_stats[column];
            
            return (
              <div key={column} className="card-hover bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 capitalize">
                  {column.replace(/_/g, ' ')} Statistics
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Basic Statistics */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-700 mb-3">Basic Statistics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Count:</span>
                        <span className="font-medium">{basic?.count?.toLocaleString() || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mean:</span>
                        <span className="font-medium">{basic?.mean?.toFixed(2) || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Median:</span>
                        <span className="font-medium">{basic?.['50%']?.toFixed(2) || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Min:</span>
                        <span className="font-medium">{basic?.min?.toFixed(2) || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Max:</span>
                        <span className="font-medium">{basic?.max?.toFixed(2) || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Statistics */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-700 mb-3">Advanced Statistics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Standard Deviation:</span>
                        <span className="font-medium">{additional?.std?.toFixed(2) || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Variance:</span>
                        <span className="font-medium">{additional?.variance?.toFixed(2) || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Skewness:</span>
                        <span className="font-medium">{additional?.skewness?.toFixed(3) || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kurtosis:</span>
                        <span className="font-medium">{additional?.kurtosis?.toFixed(3) || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mode:</span>
                        <span className="font-medium">{additional?.mode?.toFixed(2) || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quartiles */}
                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-700 mb-3">Quartiles</h4>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Q1 (25%)</div>
                      <div className="font-medium">{basic?.['25%']?.toFixed(2) || 'N/A'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Q2 (50%)</div>
                      <div className="font-medium">{basic?.['50%']?.toFixed(2) || 'N/A'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Q3 (75%)</div>
                      <div className="font-medium">{basic?.['75%']?.toFixed(2) || 'N/A'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">IQR</div>
                      <div className="font-medium">
                        {basic?.['75%'] && basic?.['25%'] 
                          ? (basic['75%'] - basic['25%']).toFixed(2) 
                          : 'N/A'
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {numeric_columns.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">No numeric columns found for statistical analysis.</div>
        </div>
      )}
    </div>
  );
};

export default StatisticsPanel;
