import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import TestCasePage from "./components/TestCasePage";
import PrivateRoute from "./components/PrivateRoute";
import { Navigate } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/testcase"
          element={
            <PrivateRoute>
              <TestCasePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
