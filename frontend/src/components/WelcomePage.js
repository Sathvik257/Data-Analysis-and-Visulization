import React, { useState } from 'react';
import { BarChart3, Upload, TrendingUp, Grid, FileText, Download, RefreshCw, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

const WelcomePage = ({ onGetStarted }) => {
  const features = [
    {
      icon: Upload,
      title: "Easy Data Upload",
      description: "Drag & drop CSV files or use our sample data to get started instantly"
    },
    {
      icon: TrendingUp,
      title: "Statistical Analysis",
      description: "Calculate averages, medians, standard deviations, and advanced statistics"
    },
    {
      icon: BarChart3,
      title: "Rich Visualizations",
      description: "Create bar charts, scatter plots, and correlation heatmaps"
    },
    {
      icon: Grid,
      title: "Automated Insights",
      description: "Get data quality assessment and intelligent recommendations"
    },
    {
      icon: Download,
      title: "Export Results",
      description: "Download visualizations and reports for presentations"
    },
    {
      icon: Sparkles,
      title: "Real-time Analysis",
      description: "Process data instantly with powerful backend algorithms"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Load Sample Data",
      description: "Click 'Load Sample Data' to explore with pre-loaded employee data"
    },
    {
      number: "02", 
      title: "Upload Your Data",
      description: "Drag & drop your CSV files to analyze your own datasets"
    },
    {
      number: "03",
      title: "Explore & Analyze",
      description: "Navigate through tabs to view statistics, create visualizations, and get insights"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-90"></div>
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <BarChart3 className="h-16 w-16 text-white mr-4" />
              <h1 className="text-6xl font-bold text-white">Data Analysis Dashboard</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Transform your CSV data into powerful insights with beautiful visualizations, 
              comprehensive statistics, and automated analysis recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onGetStarted}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={onGetStarted}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-200 flex items-center justify-center"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Load Sample Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for comprehensive data analysis in one beautiful interface
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card-hover bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes with our simple 3-step process
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sample Data Preview */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Sample Data Included</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Try our pre-loaded employee dataset with 1000 records to explore all features
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-8 mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Dataset Columns</h3>
                  <div className="space-y-2">
                    {['Age', 'Income', 'Education_Years', 'Experience_Years'].map((col, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{col}</span>
                      </div>
                    ))}
                    {['Department', 'Performance_Score', 'Satisfaction_Rating', 'City'].map((col, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{col}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">What You Can Discover</h3>
                  <div className="space-y-2">
                    {[
                      'Average employee age and income',
                      'Department salary distributions', 
                      'Education vs income correlation',
                      'Experience vs performance relationship'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center mx-auto"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Load Sample Data & Start Exploring
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <BarChart3 className="h-8 w-8 text-blue-400 mr-3" />
            <h3 className="text-2xl font-bold">Data Analysis Dashboard</h3>
          </div>
          <p className="text-gray-400 mb-6">
            Built with React, Flask, Pandas, and Matplotlib for comprehensive data analysis
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <span>• CSV File Upload</span>
            <span>• Statistical Analysis</span>
            <span>• Data Visualizations</span>
            <span>• Automated Insights</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
