# Data Analysis Dashboard

A comprehensive web application for analyzing CSV data with powerful visualizations, statistical analysis, and automated insights. Built with React frontend and Flask backend using Pandas and Matplotlib.

## 🚀 Features

### Data Analysis
- **CSV File Upload**: Drag & drop or browse to upload CSV files
- **Statistical Analysis**: Calculate averages, medians, standard deviations, skewness, kurtosis
- **Data Overview**: View data structure, column types, and sample data
- **Missing Data Detection**: Identify and analyze missing values

### Visualizations
- **Bar Charts**: Create bar charts for categorical data or grouped comparisons
- **Scatter Plots**: Explore relationships between numeric variables with trend lines
- **Correlation Heatmaps**: Visualize correlations between numeric columns
- **Download Visualizations**: Export charts as PNG images

### Automated Insights
- **Data Quality Assessment**: Automated analysis of data completeness and quality
- **Correlation Analysis**: Identify strong relationships between variables
- **Pattern Detection**: Discover trends and patterns in your data
- **Recommendations**: Get suggestions for further analysis

### Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Beautiful Interface**: Modern design with smooth animations
- **Intuitive Navigation**: Easy-to-use tabbed interface
- **Real-time Feedback**: Loading states and error handling

## 🛠️ Technology Stack

### Backend
- **Flask**: Python web framework
- **Pandas**: Data manipulation and analysis
- **Matplotlib**: Data visualization
- **Seaborn**: Statistical data visualization
- **NumPy**: Numerical computing
- **Flask-CORS**: Cross-origin resource sharing

### Frontend
- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **React Dropzone**: File upload component
- **Lucide React**: Beautiful icons

## 📦 Installation & Setup

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment** (recommended):
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install Python dependencies**:
   ```bash
   pip install -r ../requirements.txt
   ```

4. **Run the Flask server**:
   ```bash
   python app.py
   ```
   
   The backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

3. **Start the React development server**:
   ```bash
   npm start
   ```
   
   The frontend will be available at `http://localhost:3000`

## 🎯 Usage Guide

### 1. Upload Data
- **Option A**: Click "Load Sample Data" to try the application with sample employee data
- **Option B**: Upload your own CSV file by dragging and dropping or clicking to browse

### 2. Explore Data Overview
- View basic information about your dataset (rows, columns, data types)
- Examine column information and sample data
- Preview the first 10 rows of your data

### 3. Analyze Statistics
- View comprehensive statistical measures for numeric columns
- See basic statistics (mean, median, min, max, quartiles)
- Review advanced statistics (standard deviation, variance, skewness, kurtosis)

### 4. Create Visualizations
- **Bar Charts**: Select categorical or numeric columns for X-axis, optional Y-axis for grouped charts
- **Scatter Plots**: Choose two numeric columns to explore relationships
- **Heatmaps**: Generate correlation matrices for numeric columns
- Download any visualization as PNG

### 5. Review Insights
- Get automated analysis of your data quality
- Discover correlations and patterns
- Receive recommendations for further analysis

## 📊 Sample Data

The application includes sample employee data with the following columns:
- **Age**: Employee age (numeric)
- **Income**: Annual income (numeric)
- **Education_Years**: Years of education (numeric)
- **Experience_Years**: Years of work experience (numeric)
- **Department**: Department name (categorical)
- **Performance_Score**: Performance rating (numeric)
- **Satisfaction_Rating**: Job satisfaction rating (categorical)
- **City**: Employee location (categorical)

## 🔧 API Endpoints

### Backend API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/upload` | POST | Upload and process CSV file |
| `/api/sample-data` | GET | Load sample dataset |
| `/api/stats` | GET | Get statistical analysis |
| `/api/bar-chart` | POST | Generate bar chart |
| `/api/scatter-plot` | POST | Generate scatter plot |
| `/api/heatmap` | POST | Generate correlation heatmap |
| `/api/insights` | GET | Get automated insights |

### Example API Usage

**Upload CSV file**:
```bash
curl -X POST -F "file=@your_data.csv" http://localhost:5000/api/upload
```

**Create scatter plot**:
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"x_column": "Age", "y_column": "Income", "title": "Age vs Income"}' \
  http://localhost:5000/api/scatter-plot
```

## 🎨 Customization

### Styling
- Modify `frontend/tailwind.config.js` to customize colors and themes
- Update `frontend/src/index.css` for global styles
- Component-specific styles can be added using Tailwind classes

### Backend Configuration
- Adjust visualization settings in `backend/app.py`
- Modify statistical calculations in the `DataAnalyzer` class
- Add new visualization types by extending the existing methods

## 🐛 Troubleshooting

### Common Issues

**Backend won't start**:
- Ensure Python dependencies are installed: `pip install -r requirements.txt`
- Check if port 5000 is available
- Verify Python version compatibility

**Frontend won't start**:
- Install Node.js dependencies: `npm install`
- Check if port 3000 is available
- Clear npm cache: `npm cache clean --force`

**File upload fails**:
- Ensure file is in CSV format
- Check file size (large files may take time to process)
- Verify backend is running on port 5000

**Visualizations not displaying**:
- Check browser console for errors
- Ensure backend is running and accessible
- Verify data contains numeric columns for visualizations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Powered by [Flask](https://flask.palletsprojects.com/)
- Data analysis with [Pandas](https://pandas.pydata.org/)
- Visualizations with [Matplotlib](https://matplotlib.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)

---

**Happy Analyzing! 📊✨**
