# Quick Setup Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure Environment

Copy the example environment file:
```bash
cd backend
cp env.example .env
```

Edit `.env` with your values:
```env
MONGODB_URI=mongodb://localhost:27017/testcasegenerator
JWT_SECRET=yoursecretkey123
GEMINI_API_KEY=your_actual_gemini_api_key
PORT=5000
```

### 3. Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key to your `.env` file

### 4. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Open Your Browser

Navigate to: `http://localhost:5173`

## 🎯 What You'll See

- **Beautiful landing page** with gradient design
- **User registration and login** system
- **AI-powered test case generator** supporting multiple languages
- **Sample code templates** for quick testing
- **Save and manage** your generated test cases

## 🧪 Try It Out

1. **Sign up** for a new account
2. **Select JavaScript** as your language
3. **Click "Load Sample Code"** to see an example
4. **Click "Generate Test Cases"** to see AI in action
5. **Save your results** for future reference

## 🚨 Common Issues

**"MongoDB connection failed"**
- Make sure MongoDB is running locally
- Or use MongoDB Atlas (cloud) instead

**"AI generation failed"**
- Check your Gemini API key in `.env`
- Verify the API key is correct and active

**"Frontend won't start"**
- Ensure you're using Node.js 16+
- Clear `node_modules` and run `npm install` again

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore the code structure in `src/components/`
- Customize the styling in `src/App.css`
- Add support for new programming languages

---

**Need help?** Check the troubleshooting section in the main README or open an issue on GitHub.
