import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const FileUpload = ({ onFileUpload, loading }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false,
    maxFiles: 1
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Upload Your Data</h2>
        <p className="text-gray-600 text-lg">
          Upload a CSV file to start analyzing your data with powerful visualizations and insights
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Area */}
        <div className="card-hover bg-white rounded-xl shadow-lg p-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
              isDragActive
                ? 'border-primary-400 bg-primary-50'
                : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input {...getInputProps()} disabled={loading} />
            <div className="flex flex-col items-center space-y-4">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <Upload className="h-12 w-12 text-gray-400" />
              )}
              <div>
                <p className="text-lg font-medium text-gray-700">
                  {isDragActive ? 'Drop the file here' : 'Drag & drop your CSV file here'}
                </p>
                <p className="text-gray-500 mt-2">or click to browse</p>
              </div>
            </div>
          </div>

          {fileRejections.length > 0 && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <div className="text-red-700">
                  <p className="font-medium">Invalid file type</p>
                  <p className="text-sm">Please upload a CSV file (.csv)</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="space-y-6">
          <div className="card-hover bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FileText className="h-6 w-6 text-primary-500 mr-2" />
              What You Can Do
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                Calculate averages and statistical measures
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                Create interactive bar charts and scatter plots
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                Generate correlation heatmaps
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                Get automated insights and observations
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                Export visualizations and reports
              </li>
            </ul>
          </div>

          <div className="card-hover bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-4">Sample Data Available</h3>
            <p className="text-blue-100 mb-4">
              Don't have a CSV file? Try our sample dataset with employee data including age, income, education, and performance metrics.
            </p>
            <p className="text-sm text-blue-200">
              Click "Load Sample Data" in the header to get started immediately!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
