import React from 'react';
import { FileText, Database, Columns } from 'lucide-react';

const DataTable = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Data Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card-hover bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Database className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{data.shape[0].toLocaleString()}</p>
              <p className="text-gray-600">Total Rows</p>
            </div>
          </div>
        </div>

        <div className="card-hover bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Columns className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{data.shape[1]}</p>
              <p className="text-gray-600">Total Columns</p>
            </div>
          </div>
        </div>

        <div className="card-hover bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {Object.keys(data.dtypes).filter(key => 
                  data.dtypes[key] === 'int64' || data.dtypes[key] === 'float64'
                ).length}
              </p>
              <p className="text-gray-600">Numeric Columns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Column Information */}
      <div className="card-hover bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Column Information</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Column Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sample Values
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.columns.map((column, index) => (
                <tr key={column} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {column}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      data.dtypes[column] === 'int64' || data.dtypes[column] === 'float64'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {data.dtypes[column]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-wrap gap-1">
                      {data.sample.slice(0, 3).map((row, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs">
                          {row[column] !== null && row[column] !== undefined 
                            ? String(row[column]).substring(0, 20)
                            : 'N/A'
                          }
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Data Preview */}
      <div className="card-hover bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Data Preview (First 10 Rows)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {data.columns.map((column) => (
                  <th key={column} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.sample.slice(0, 10).map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {data.columns.map((column) => (
                    <td key={column} className="px-4 py-3 text-sm text-gray-900">
                      {row[column] !== null && row[column] !== undefined 
                        ? String(row[column])
                        : <span className="text-gray-400 italic">N/A</span>
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
