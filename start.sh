#!/bin/bash

echo "Starting Data Analysis Dashboard..."
echo

echo "Installing Python dependencies..."
cd backend
pip install -r ../requirements.txt
if [ $? -ne 0 ]; then
    echo "Error installing Python dependencies"
    exit 1
fi

echo
echo "Starting Flask backend server..."
python app.py &
BACKEND_PID=$!

echo
echo "Waiting for backend to start..."
sleep 3

echo "Installing Node.js dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "Error installing Node.js dependencies"
    kill $BACKEND_PID
    exit 1
fi

echo
echo "Starting React frontend..."
npm start &
FRONTEND_PID=$!

echo
echo "========================================"
echo "Data Analysis Dashboard is starting!"
echo "========================================"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo
echo "Press Ctrl+C to stop both servers..."

# Wait for user interrupt
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
