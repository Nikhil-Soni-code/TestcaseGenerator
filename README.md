# AI Test Case Generator

An intelligent web application that automatically generates comprehensive test cases for your code using AI. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and powered by Google's Gemini AI.

## 🚀 Features

### **AI-Powered Test Generation**
- **Multi-language Support**: JavaScript, Python, Java, C++, etc
- **Comprehensive Coverage**: Normal scenarios, edge cases, boundary conditions, and error handling
- **Smart Analysis**: AI analyzes your code structure and generates relevant test cases
- **Production Ready**: Generates runnable test code with clear descriptions

### **User Experience**
- **Modern UI**: Beautiful, responsive design with gradient backgrounds
- **Code Templates**: Pre-built sample code for different languages
- **Real-time Validation**: Instant feedback and error handling
- **Loading States**: Visual feedback during AI processing

### **Test Case Management**
- **Save & Organize**: Store generated test cases for future reference
- **Easy Access**: Quick copy-to-clipboard functionality
- **History Tracking**: View all your previously generated test cases
- **CRUD Operations**: Create, read, update, and delete test cases

### **Security & Authentication**
- **User Registration**: Secure signup with email validation
- **JWT Authentication**: Protected routes and secure API access
- **User Isolation**: Each user can only access their own test cases

## 🛠️ Technology Stack

### **Frontend**
- React.js 18+ with Hooks
- Vite for fast development and building
- Modern CSS with responsive design
- Component-based architecture

### **Backend**
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Google Gemini AI API integration

### **AI Integration**
- Google Generative AI (Gemini 1.5 Flash)
- Intelligent prompt engineering
- Context-aware test case generation

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Google Gemini API Key** (free tier available)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd testcasegenerator
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
PORT=5000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

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

The application will be available at `http://localhost:5173`

## 🔑 Getting Your Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key to your `.env` file

## 📖 Usage Guide

### **1. User Registration**
- Navigate to the signup page
- Create an account with username, email, and password
- Login with your credentials

### **2. Generate Test Cases**
- Paste your code in the text area
- Click "Generate Test Cases"
- Wait for AI to analyze and generate comprehensive tests

### **3. Manage Test Cases**
- **Save**: Store generated test cases for future reference
- **Copy**: Quick copy-to-clipboard for immediate use
- **View History**: Access all your previously generated tests
- **Delete**: Remove unwanted test cases

### **4. Code Templates**
- Use the "Load Sample Code" button to see examples
- Modify the sample code or paste your own
- Switch between languages to see different examples

## 🎯 Example Use Cases

### **JavaScript Function**
```javascript
function calculateSum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  return a + b;
}
```

**AI Generated Tests:**
- Normal case: `calculateSum(2, 3)` should return `5`
- Edge case: `calculateSum(0, 0)` should return `0`
- Error case: `calculateSum("2", 3)` should throw error
- Boundary case: `calculateSum(Number.MAX_SAFE_INTEGER, 1)` should handle large numbers

### **Python Function**
```python
def calculate_sum(a, b):
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        raise ValueError("Both arguments must be numbers")
    return a + b
```

## 🔧 API Endpoints

### **Authentication**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### **Test Cases**
- `POST /testcase/generate` - Generate test cases using AI
- `POST /testcase/create` - Save a test case
- `GET /testcase` - Get user's test cases
- `PUT /testcase/:id` - Update a test case
- `DELETE /testcase/:id` - Delete a test case

## 🎨 Customization

### **Adding New Languages**
1. Update the `codeTemplates` object in `TestCasePage.jsx`
2. Update the AI prompt in the backend route

### **Styling Changes**
- Modify `frontend/src/App.css` for visual changes
- Update color schemes, fonts, and layouts
- Add new CSS classes for additional components

## 🚨 Troubleshooting

### **Common Issues**

1. **MongoDB Connection Error**
   - Check your connection string in `.env`
   - Ensure MongoDB is running
   - Verify network access if using Atlas

2. **AI Generation Fails**
   - Verify your Gemini API key is correct
   - Check API quota and billing status
   - Ensure the code input is valid

3. **Frontend Build Issues**
   - Clear `node_modules` and reinstall
   - Check Node.js version compatibility
   - Verify all dependencies are installed

### **Performance Tips**
- Use code snippets under 1000 lines for optimal AI processing
- Clear browser cache if experiencing UI issues
- Monitor API usage to stay within free tier limits

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for providing the AI capabilities
- **MERN Stack Community** for excellent documentation and examples
- **Open Source Contributors** who made this project possible

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the console logs for error messages
3. Open an issue on the GitHub repository
4. Contact the development team

---

**Happy Testing! 🧪✨**

Generate comprehensive test cases in seconds, not hours. Let AI handle the repetitive work while you focus on building amazing software.
