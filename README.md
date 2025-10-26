<!-- Banner -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:00E5FF,100:7F00FF&height=200&section=header&text=Data%20Analysis%20Dashboard%20📊&fontSize=42&fontAlignY=35&animation=twinkling&fontColor=fff" alt="banner"/>
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1200&color=00E5FF&center=true&vCenter=true&width=650&lines=Analyze+CSV+Data+with+Ease;Interactive+Visualizations+%26+Automated+Insights;Built+with+React+%2B+Flask+%2B+Pandas" alt="Typing SVG" />
</p>

---

## 🧠 Overview

**Data Analysis Dashboard** is a full-stack web application that allows you to upload CSV files, perform automated statistical analysis, visualize data, and gain insights — all in your browser.

> 🧩 Tech Stack: **React + Tailwind CSS (Frontend)** | **Flask + Pandas + Matplotlib (Backend)**

---

## 🚀 Features

- 📂 Upload CSV files via drag-and-drop  
- 🧮 Compute mean, median, std, skewness, kurtosis  
- 📊 Generate bar charts, scatter plots & heatmaps  
- 🤖 Get automated insights & recommendations  
- 💾 Download visualizations as PNG  
- 💻 Beautiful responsive UI with real-time feedback  

---
## 🎯 How to Use the Dashboard

Once both servers are running:

### 🧩 Upload Data
- Click **Upload CSV** or **Load Sample Data**  
- Supports **drag-and-drop** or **file browse**

### 🔍 Explore Data
- View **column info**, **datatypes**, and **sample rows**  
- Detect **missing or incomplete values**

### 📊 Analyze Statistics
- Displays key metrics: **mean**, **median**, **standard deviation**, **skewness**, **kurtosis**  
- View all stats in **tabular format**

### 📈 Generate Visuals
- **Bar Charts**: Compare categories or groups  
- **Scatter Plots**: Explore relationships between variables  
- **Heatmaps**: Show correlation between numeric fields  
- 💾 Download any visualization as **PNG**

### 🤖 Get Automated Insights
- ✅ Data quality assessment  
- 🔗 Correlation detection  
- 📈 Trend and pattern discovery  
- 💡 Analysis recommendations

## ⚙️ Installation & Usage (Complete Setup)

### 🧰 Requirements
Make sure you have installed:
- **Python ≥ 3.8**
- **Node.js ≥ 16**
- **npm or yarn**

### 🔧 Step-by-Step Setup
Run everything from the **root project folder**:

```bash
# 1️⃣ Clone the repository
git clone https://github.com/Sathvik257/Data-Analysis-and-Visulization.git
cd Data-Analysis-and-Visulization

# 2️⃣ Setup the backend (Flask)
cd backend
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install backend dependencies
pip install -r ../requirements.txt

# Start the backend server
python app.py
# → Backend runs at http://localhost:5000

# 3️⃣ Setup the frontend (React)
cd ../frontend
npm install

# Start the React app
npm start
# → Frontend runs at http://localhost:3000
