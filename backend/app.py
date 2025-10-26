from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import plotly.graph_objs as go
import plotly.express as px
from plotly.utils import PlotlyJSONEncoder
import json
import os
import io
import base64
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configure matplotlib for better plots
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

class DataAnalyzer:
    def __init__(self):
        self.data = None
        self.file_path = None
        
    def load_csv(self, file_path):
        """Load CSV file and return basic info"""
        try:
            self.data = pd.read_csv(file_path)
            self.file_path = file_path
            
            # Convert dtypes to strings for JSON serialization
            dtypes_dict = {str(k): str(v) for k, v in self.data.dtypes.to_dict().items()}
            
            return {
                'success': True,
                'shape': self.data.shape,
                'columns': self.data.columns.tolist(),
                'dtypes': dtypes_dict,
                'sample': self.data.head().to_dict('records')
            }
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def get_basic_stats(self):
        """Get basic statistics for numeric columns"""
        if self.data is None:
            return {'error': 'No data loaded'}
        
        numeric_cols = self.data.select_dtypes(include=[np.number]).columns
        stats = self.data[numeric_cols].describe().to_dict()
        
        # Convert numpy types to Python types for JSON serialization
        def convert_numpy_types(obj):
            if isinstance(obj, dict):
                return {k: convert_numpy_types(v) for k, v in obj.items()}
            elif isinstance(obj, list):
                return [convert_numpy_types(item) for item in obj]
            elif hasattr(obj, 'item'):  # numpy scalar
                return obj.item()
            elif hasattr(obj, 'tolist'):  # numpy array
                return obj.tolist()
            else:
                return obj
        
        stats = convert_numpy_types(stats)
        
        # Add additional statistics
        additional_stats = {}
        for col in numeric_cols:
            additional_stats[col] = {
                'mean': float(self.data[col].mean()) if not pd.isna(self.data[col].mean()) else None,
                'median': float(self.data[col].median()) if not pd.isna(self.data[col].median()) else None,
                'mode': float(self.data[col].mode().iloc[0]) if not self.data[col].mode().empty else None,
                'std': float(self.data[col].std()) if not pd.isna(self.data[col].std()) else None,
                'variance': float(self.data[col].var()) if not pd.isna(self.data[col].var()) else None,
                'skewness': float(self.data[col].skew()) if not pd.isna(self.data[col].skew()) else None,
                'kurtosis': float(self.data[col].kurtosis()) if not pd.isna(self.data[col].kurtosis()) else None
            }
        
        return {
            'basic_stats': stats,
            'additional_stats': additional_stats,
            'numeric_columns': numeric_cols.tolist()
        }
    
    def create_bar_chart(self, x_col, y_col=None, title="Bar Chart"):
        """Create bar chart visualization"""
        if self.data is None:
            return {'error': 'No data loaded'}
        
        plt.figure(figsize=(12, 8))
        
        if y_col is None:
            # Count plot
            value_counts = self.data[x_col].value_counts().head(10)
            plt.bar(range(len(value_counts)), value_counts.values)
            plt.xticks(range(len(value_counts)), value_counts.index, rotation=45)
            plt.ylabel('Count')
        else:
            # Grouped bar chart
            grouped_data = self.data.groupby(x_col)[y_col].mean().head(10)
            plt.bar(range(len(grouped_data)), grouped_data.values)
            plt.xticks(range(len(grouped_data)), grouped_data.index, rotation=45)
            plt.ylabel(f'Average {y_col}')
        
        plt.title(title)
        plt.xlabel(x_col)
        plt.tight_layout()
        
        # Save plot to base64 string
        img_buffer = io.BytesIO()
        plt.savefig(img_buffer, format='png', dpi=300, bbox_inches='tight')
        img_buffer.seek(0)
        img_base64 = base64.b64encode(img_buffer.getvalue()).decode()
        plt.close()
        
        return {'image': img_base64}
    
    def create_scatter_plot(self, x_col, y_col, title="Scatter Plot"):
        """Create scatter plot visualization"""
        if self.data is None:
            return {'error': 'No data loaded'}
        
        plt.figure(figsize=(12, 8))
        
        # Create scatter plot
        plt.scatter(self.data[x_col], self.data[y_col], alpha=0.6, s=50)
        
        # Add trend line
        z = np.polyfit(self.data[x_col].dropna(), self.data[y_col].dropna(), 1)
        p = np.poly1d(z)
        plt.plot(self.data[x_col], p(self.data[x_col]), "r--", alpha=0.8)
        
        plt.xlabel(x_col)
        plt.ylabel(y_col)
        plt.title(title)
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        
        # Calculate correlation
        correlation = self.data[x_col].corr(self.data[y_col])
        
        # Save plot to base64 string
        img_buffer = io.BytesIO()
        plt.savefig(img_buffer, format='png', dpi=300, bbox_inches='tight')
        img_buffer.seek(0)
        img_base64 = base64.b64encode(img_buffer.getvalue()).decode()
        plt.close()
        
        return {'image': img_base64, 'correlation': correlation}
    
    def create_heatmap(self, columns=None, title="Correlation Heatmap"):
        """Create correlation heatmap"""
        if self.data is None:
            return {'error': 'No data loaded'}
        
        if columns is None:
            numeric_data = self.data.select_dtypes(include=[np.number])
        else:
            numeric_data = self.data[columns]
        
        plt.figure(figsize=(12, 10))
        correlation_matrix = numeric_data.corr()
        
        sns.heatmap(correlation_matrix, 
                   annot=True, 
                   cmap='coolwarm', 
                   center=0,
                   square=True,
                   fmt='.2f',
                   cbar_kws={'shrink': 0.8})
        
        plt.title(title)
        plt.tight_layout()
        
        # Save plot to base64 string
        img_buffer = io.BytesIO()
        plt.savefig(img_buffer, format='png', dpi=300, bbox_inches='tight')
        img_buffer.seek(0)
        img_base64 = base64.b64encode(img_buffer.getvalue()).decode()
        plt.close()
        
        return {'image': img_base64}
    
    def generate_insights(self):
        """Generate insights and observations from the data"""
        if self.data is None:
            return {'error': 'No data loaded'}
        
        insights = []
        
        # Basic data info
        insights.append(f"Dataset contains {self.data.shape[0]} rows and {self.data.shape[1]} columns")
        
        # Missing data analysis
        missing_data = self.data.isnull().sum()
        if missing_data.sum() > 0:
            insights.append(f"Missing data detected in {missing_data[missing_data > 0].count()} columns")
            for col, missing_count in missing_data[missing_data > 0].items():
                percentage = (missing_count / len(self.data)) * 100
                insights.append(f"  - {col}: {missing_count} missing values ({percentage:.1f}%)")
        else:
            insights.append("No missing data found in the dataset")
        
        # Numeric columns analysis
        numeric_cols = self.data.select_dtypes(include=[np.number]).columns
        if len(numeric_cols) > 0:
            insights.append(f"Found {len(numeric_cols)} numeric columns for analysis")
            
            # Find columns with high correlation
            if len(numeric_cols) > 1:
                corr_matrix = self.data[numeric_cols].corr()
                high_corr_pairs = []
                for i in range(len(corr_matrix.columns)):
                    for j in range(i+1, len(corr_matrix.columns)):
                        corr_val = corr_matrix.iloc[i, j]
                        if abs(corr_val) > 0.7:
                            high_corr_pairs.append((corr_matrix.columns[i], corr_matrix.columns[j], corr_val))
                
                if high_corr_pairs:
                    insights.append("High correlation found between:")
                    for col1, col2, corr in high_corr_pairs:
                        insights.append(f"  - {col1} and {col2}: {corr:.3f}")
        
        # Categorical columns analysis
        categorical_cols = self.data.select_dtypes(include=['object']).columns
        if len(categorical_cols) > 0:
            insights.append(f"Found {len(categorical_cols)} categorical columns")
            for col in categorical_cols:
                unique_count = self.data[col].nunique()
                insights.append(f"  - {col}: {unique_count} unique values")
        
        return {'insights': insights}

# Initialize analyzer
analyzer = DataAnalyzer()

@app.route('/api/upload', methods=['POST'])
def upload_file():
    """Upload and load CSV file"""
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if not file.filename.endswith('.csv'):
        return jsonify({'error': 'Please upload a CSV file'}), 400
    
    # Save file temporarily
    file_path = f"temp_{file.filename}"
    file.save(file_path)
    
    # Load and analyze
    result = analyzer.load_csv(file_path)
    
    # Clean up temp file
    if os.path.exists(file_path):
        os.remove(file_path)
    
    return jsonify(result)

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get basic statistics"""
    return jsonify(analyzer.get_basic_stats())

@app.route('/api/bar-chart', methods=['POST'])
def create_bar_chart():
    """Create bar chart"""
    data = request.json
    x_col = data.get('x_column')
    y_col = data.get('y_column')
    title = data.get('title', 'Bar Chart')
    
    return jsonify(analyzer.create_bar_chart(x_col, y_col, title))

@app.route('/api/scatter-plot', methods=['POST'])
def create_scatter_plot():
    """Create scatter plot"""
    data = request.json
    x_col = data.get('x_column')
    y_col = data.get('y_column')
    title = data.get('title', 'Scatter Plot')
    
    return jsonify(analyzer.create_scatter_plot(x_col, y_col, title))

@app.route('/api/heatmap', methods=['POST'])
def create_heatmap():
    """Create heatmap"""
    data = request.json
    columns = data.get('columns')
    title = data.get('title', 'Correlation Heatmap')
    
    return jsonify(analyzer.create_heatmap(columns, title))

@app.route('/api/insights', methods=['GET'])
def get_insights():
    """Get data insights"""
    return jsonify(analyzer.generate_insights())

@app.route('/api/sample-data', methods=['GET'])
def get_sample_data():
    """Generate sample data for demonstration"""
    import time
    np.random.seed(int(time.time()) % 2**32)
    
    # Create sample dataset
    n_samples = 1000
    data = {
        'Age': np.random.normal(35, 12, n_samples).astype(int),
        'Income': np.random.normal(50000, 15000, n_samples),
        'Education_Years': np.random.normal(14, 3, n_samples).astype(int),
        'Experience_Years': np.random.normal(8, 5, n_samples).astype(int),
        'Department': np.random.choice(['IT', 'Marketing', 'Sales', 'HR', 'Finance'], n_samples),
        'Performance_Score': np.random.normal(75, 15, n_samples),
        'Satisfaction_Rating': np.random.choice([1, 2, 3, 4, 5], n_samples),
        'City': np.random.choice(['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'], n_samples)
    }
    
    df = pd.DataFrame(data)
    
    # Add some correlations
    df['Income'] = df['Income'] + df['Education_Years'] * 2000 + np.random.normal(0, 5000, n_samples)
    df['Performance_Score'] = df['Performance_Score'] + df['Experience_Years'] * 2 + np.random.normal(0, 10, n_samples)
    
    # Save sample data
    sample_file = 'sample_data.csv'
    df.to_csv(sample_file, index=False)
    
    # Load it into analyzer
    result = analyzer.load_csv(sample_file)
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
