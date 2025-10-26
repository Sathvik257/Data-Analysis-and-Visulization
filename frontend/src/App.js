import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, BarChart3, Grid, TrendingUp, FileText, Download, RefreshCw } from 'lucide-react';
import WelcomePage from './components/WelcomePage';
import FileUpload from './components/FileUpload';
import DataTable from './components/DataTable';
import StatisticsPanel from './components/StatisticsPanel';
import VisualizationPanel from './components/VisualizationPanel';
import InsightsPanel from './components/InsightsPanel';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('welcome');
  const [stats, setStats] = useState(null);
  const [insights, setInsights] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const loadSampleData = async () => {
    setLoading(true);
    setError(null);
    setShowWelcome(false);
    try {
      const response = await axios.get('/api/sample-data');
      setData(response.data);
      await loadStats();
      await loadInsights();
      setActiveTab('overview');
    } catch (err) {
      setError('Failed to load sample data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetStarted = () => {
    setShowWelcome(false);
    setActiveTab('upload');
  };

  const loadStats = async () => {
    try {
      const response = await axios.get('/api/stats');
      setStats(response.data);
    } catch (err) {
      console.error('Failed to load statistics:', err);
    }
  };

  const loadInsights = async () => {
    try {
      const response = await axios.get('/api/insights');
      setInsights(response.data);
    } catch (err) {
      console.error('Failed to load insights:', err);
    }
  };

  const handleFileUpload = async (file) => {
    setLoading(true);
    setError(null);
    setShowWelcome(false);
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.success) {
        setData(response.data);
        await loadStats();
        await loadInsights();
        setActiveTab('overview');
      } else {
        setError(response.data.error || 'Failed to process file');
      }
    } catch (err) {
      setError('Failed to upload file: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'upload', label: 'Upload Data', icon: Upload },
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'statistics', label: 'Statistics', icon: TrendingUp },
    { id: 'visualizations', label: 'Visualizations', icon: BarChart3 },
    { id: 'insights', label: 'Insights', icon: Grid },
  ];

  if (showWelcome) {
    return <WelcomePage onGetStarted={handleGetStarted} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="gradient-bg text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Data Analysis Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowWelcome(true)}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <span>← Back to Welcome</span>
              </button>
              <button
                onClick={loadSampleData}
                disabled={loading}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Load Sample Data</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {loading && <LoadingSpinner />}
        
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-red-600 font-medium">Error: {error}</div>
            </div>
          </div>
        )}

        <div className="animate-fade-in">
          {activeTab === 'upload' && (
            <FileUpload onFileUpload={handleFileUpload} loading={loading} />
          )}

          {activeTab === 'overview' && data && (
            <DataTable data={data} />
          )}

          {activeTab === 'statistics' && stats && (
            <StatisticsPanel stats={stats} />
          )}

          {activeTab === 'visualizations' && data && (
            <VisualizationPanel data={data} />
          )}

          {activeTab === 'insights' && insights && (
            <InsightsPanel insights={insights} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            Built with React, Flask, Pandas, and Matplotlib for comprehensive data analysis
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
