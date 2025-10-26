import React from 'react';
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const InsightsPanel = ({ insights }) => {
  if (!insights || insights.error) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">No insights available. Please upload data first.</div>
      </div>
    );
  }

  const { insights: insightList } = insights;

  const getInsightIcon = (insight, index) => {
    if (insight.includes('Missing data')) {
      return <AlertTriangle className="h-5 w-5 text-orange-500" />;
    } else if (insight.includes('High correlation')) {
      return <TrendingUp className="h-5 w-5 text-blue-500" />;
    } else if (insight.includes('Found') && insight.includes('numeric')) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else if (insight.includes('Dataset contains')) {
      return <Info className="h-5 w-5 text-purple-500" />;
    } else {
      return <Lightbulb className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getInsightColor = (insight) => {
    if (insight.includes('Missing data')) {
      return 'bg-orange-50 border-orange-200';
    } else if (insight.includes('High correlation')) {
      return 'bg-blue-50 border-blue-200';
    } else if (insight.includes('Found') && insight.includes('numeric')) {
      return 'bg-green-50 border-green-200';
    } else if (insight.includes('Dataset contains')) {
      return 'bg-purple-50 border-purple-200';
    } else {
      return 'bg-yellow-50 border-yellow-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Lightbulb className="h-8 w-8 text-yellow-500 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">Data Insights & Observations</h2>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Automated analysis of your dataset to help you understand patterns, relationships, and potential areas for further investigation.
        </p>
      </div>

      {/* Insights Grid */}
      <div className="grid gap-4">
        {insightList.map((insight, index) => (
          <div
            key={index}
            className={`card-hover rounded-lg border-l-4 p-6 ${getInsightColor(insight)}`}
          >
            <div className="flex items-start space-x-3">
              {getInsightIcon(insight, index)}
              <div className="flex-1">
                <p className="text-gray-800 leading-relaxed">{insight}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Analysis Suggestions */}
      <div className="card-hover bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">Recommended Next Steps</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">For Further Analysis:</h4>
            <ul className="space-y-1 text-indigo-100">
              <li>• Create scatter plots for highly correlated variables</li>
              <li>• Analyze distributions with histograms</li>
              <li>• Investigate outliers in your data</li>
              <li>• Consider data transformation if needed</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">For Missing Data:</h4>
            <ul className="space-y-1 text-indigo-100">
              <li>• Consider imputation strategies</li>
              <li>• Analyze patterns in missing data</li>
              <li>• Determine if missing data is random</li>
              <li>• Document data quality issues</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Data Quality Score */}
      <div className="card-hover bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Data Quality Assessment</h3>
        
        <div className="space-y-4">
          {/* Missing Data Score */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Data Completeness</span>
              <span className="text-sm font-medium text-gray-600">
                {insightList.some(insight => insight.includes('No missing data')) ? '100%' : 'Needs Review'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  insightList.some(insight => insight.includes('No missing data')) 
                    ? 'bg-green-500' 
                    : 'bg-orange-500'
                }`}
                style={{
                  width: insightList.some(insight => insight.includes('No missing data')) ? '100%' : '75%'
                }}
              ></div>
            </div>
          </div>

          {/* Numeric Columns Score */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Analysis Readiness</span>
              <span className="text-sm font-medium text-gray-600">
                {insightList.some(insight => insight.includes('numeric columns')) ? 'Good' : 'Limited'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  insightList.some(insight => insight.includes('numeric columns')) 
                    ? 'bg-green-500' 
                    : 'bg-yellow-500'
                }`}
                style={{
                  width: insightList.some(insight => insight.includes('numeric columns')) ? '90%' : '60%'
                }}
              ></div>
            </div>
          </div>

          {/* Correlation Analysis Score */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Relationship Analysis</span>
              <span className="text-sm font-medium text-gray-600">
                {insightList.some(insight => insight.includes('High correlation')) ? 'Rich' : 'Basic'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  insightList.some(insight => insight.includes('High correlation')) 
                    ? 'bg-blue-500' 
                    : 'bg-gray-400'
                }`}
                style={{
                  width: insightList.some(insight => insight.includes('High correlation')) ? '85%' : '50%'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsPanel;
