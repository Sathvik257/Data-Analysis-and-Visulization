import React, { useState } from 'react';
import axios from 'axios';
import { BarChart3, TrendingUp, Download, Grid } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const VisualizationPanel = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [currentViz, setCurrentViz] = useState(null);
  const [error, setError] = useState(null);
  const [correlation, setCorrelation] = useState(null);

  if (!data) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">Please upload data first to create visualizations.</div>
      </div>
    );
  }

  const numericColumns = data.columns?.filter(col => 
    data.dtypes[col] === 'int64' || data.dtypes[col] === 'float64'
  ) || [];

  const categoricalColumns = data.columns?.filter(col => 
    data.dtypes[col] === 'object'
  ) || [];

  const createVisualization = async (type, params) => {
    setLoading(true);
    setError(null);
    setCurrentViz(null);
    setCorrelation(null);

    try {
      let endpoint = '';
      let requestData = {};

      switch (type) {
        case 'bar':
          endpoint = '/api/bar-chart';
          requestData = {
            x_column: params.xColumn,
            y_column: params.yColumn,
            title: params.title
          };
          break;
        case 'scatter':
          endpoint = '/api/scatter-plot';
          requestData = {
            x_column: params.xColumn,
            y_column: params.yColumn,
            title: params.title
          };
          break;
        case 'heatmap':
          endpoint = '/api/heatmap';
          requestData = {
            columns: params.columns,
            title: params.title
          };
          break;
        default:
          throw new Error('Unknown visualization type');
      }

      const response = await axios.post(endpoint, requestData);
      
      if (response.data.error) {
        setError(response.data.error);
      } else {
        setCurrentViz(response.data.image);
        if (response.data.correlation) {
          setCorrelation(response.data.correlation);
        }
      }
    } catch (err) {
      setError('Failed to create visualization: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const BarChartForm = () => {
    const [xColumn, setXColumn] = useState('');
    const [yColumn, setYColumn] = useState('');
    const [title, setTitle] = useState('Bar Chart');

    const handleSubmit = (e) => {
      e.preventDefault();
      createVisualization('bar', { xColumn, yColumn, title });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            X-Axis Column
          </label>
          <select
            value={xColumn}
            onChange={(e) => setXColumn(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          >
            <option value="">Select a column</option>
            {[...categoricalColumns, ...numericColumns].map(col => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Y-Axis Column (Optional - for grouped bar chart)
          </label>
          <select
            value={yColumn}
            onChange={(e) => setYColumn(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Count (default)</option>
            {numericColumns.map(col => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chart Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !xColumn}
          className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loading ? <LoadingSpinner /> : 'Create Bar Chart'}
        </button>
      </form>
    );
  };

  const ScatterPlotForm = () => {
    const [xColumn, setXColumn] = useState('');
    const [yColumn, setYColumn] = useState('');
    const [title, setTitle] = useState('Scatter Plot');

    const handleSubmit = (e) => {
      e.preventDefault();
      createVisualization('scatter', { xColumn, yColumn, title });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            X-Axis Column
          </label>
          <select
            value={xColumn}
            onChange={(e) => setXColumn(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          >
            <option value="">Select a numeric column</option>
            {numericColumns.map(col => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Y-Axis Column
          </label>
          <select
            value={yColumn}
            onChange={(e) => setYColumn(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          >
            <option value="">Select a numeric column</option>
            {numericColumns.map(col => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chart Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !xColumn || !yColumn}
          className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loading ? <LoadingSpinner /> : 'Create Scatter Plot'}
        </button>
      </form>
    );
  };

  const HeatmapForm = () => {
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [title, setTitle] = useState('Correlation Heatmap');

    const handleColumnToggle = (column) => {
      setSelectedColumns(prev => 
        prev.includes(column) 
          ? prev.filter(col => col !== column)
          : [...prev, column]
      );
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      createVisualization('heatmap', { 
        columns: selectedColumns.length > 0 ? selectedColumns : null, 
        title 
      });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Columns (Leave empty for all numeric columns)
          </label>
          <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3">
            {numericColumns.map(col => (
              <label key={col} className="flex items-center space-x-2 py-1">
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(col)}
                  onChange={() => handleColumnToggle(col)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{col}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chart Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loading ? <LoadingSpinner /> : 'Create Heatmap'}
        </button>
      </form>
    );
  };

  return (
    <div className="space-y-6">
      {/* Visualization Types */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card-hover bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <BarChart3 className="h-6 w-6 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Bar Chart</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Create bar charts to visualize categorical data distributions or compare values across groups.
          </p>
          <BarChartForm />
        </div>

        <div className="card-hover bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Grid className="h-6 w-6 text-green-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Scatter Plot</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Create scatter plots to explore relationships between two numeric variables.
          </p>
          <ScatterPlotForm />
        </div>

        <div className="card-hover bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-6 w-6 text-purple-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Heatmap</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Create correlation heatmaps to visualize relationships between numeric variables.
          </p>
          <HeatmapForm />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-700 font-medium">Error: {error}</div>
        </div>
      )}

      {/* Visualization Display */}
      {currentViz && (
        <div className="card-hover bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Generated Visualization</h3>
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = `data:image/png;base64,${currentViz}`;
                link.download = 'visualization.png';
                link.click();
              }}
              className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>
          </div>
          
          <div className="text-center">
            <img 
              src={`data:image/png;base64,${currentViz}`} 
              alt="Generated visualization"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
            
            {correlation !== null && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 font-medium">
                  Correlation Coefficient: {correlation.toFixed(3)}
                </p>
                <p className="text-blue-600 text-sm mt-1">
                  {Math.abs(correlation) > 0.7 ? 'Strong correlation' : 
                   Math.abs(correlation) > 0.3 ? 'Moderate correlation' : 
                   'Weak correlation'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualizationPanel;