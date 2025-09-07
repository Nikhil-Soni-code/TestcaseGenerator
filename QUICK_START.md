# 🚀 Quick Start Guide - Fix Connection Errors

## ❌ **Error: ERR_CONNECTION_REFUSED**

This error means the backend server is not running. Here's how to fix it:

### **Step 1: Start the Backend Server**

```bash
# Open a new terminal
cd backend
npm start
```

**Expected Output:**
```
🚀 Starting AI Test Case Generator Backend...
📁 Environment loaded from: C:\...\backend\.env
🔗 MongoDB URI: mongodb://localhost:27017/testcasegenerator
🌐 Port: 5000
✅ MongoDB Connected to: mongodb://localhost:27017/testcasegenerator
🚀 Server running on port 5000
🌐 API available at: http://localhost:5000/api
```

### **Step 2: Start the Frontend**

```bash
# Open another terminal
cd frontend
npm run dev
```

**Expected Output:**
```
  VITE v7.1.3  ready in 1000 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### **Step 3: Open Your Browser**

Navigate to: `http://localhost:5173`

## 🔧 **If You Still Get Errors:**

### **MongoDB Not Running:**
```bash
# Install MongoDB locally or use MongoDB Atlas
# For local MongoDB:
mongod

# Or use MongoDB Atlas (cloud):
# Update MONGODB_URI in backend/.env
```

### **Port Already in Use:**
```bash
# Kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in backend/.env
PORT=5001
```

### **Environment File Issues:**
```bash
# The startup script will create a .env file automatically
# Just run: cd backend && npm start
```

## 📱 **Test the Application:**

1. **Go to:** `http://localhost:5173`
2. **Click:** "Sign up here"
3. **Create an account** with username, email, and password
4. **Login** with your credentials
5. **Generate test cases** by pasting code and selecting language

## 🆘 **Still Having Issues?**

1. **Check Terminal Output** - Look for error messages
2. **Verify Ports** - Make sure nothing else is using port 5000
3. **Check MongoDB** - Ensure database is running
4. **Restart Both Servers** - Stop and start again

## 📞 **Need Help?**

- Check the console logs in your browser (F12)
- Look at the terminal output for error messages
- Ensure both servers are running simultaneously

---

**🎯 Goal:** Get both backend (port 5000) and frontend (port 5173) running at the same time!
