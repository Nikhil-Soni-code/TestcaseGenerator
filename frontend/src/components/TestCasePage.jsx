import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const TestCasePage = () => {
  const [code, setCode] = useState("");
  const [testCases, setTestCases] = useState([]); // always an array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedTestCases, setSavedTestCases] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadSavedTestCases();
  }, []);

  const loadSavedTestCases = async () => {
    try {
      const response = await API.get("/api/testcase");
      setSavedTestCases(response.data || []);
    } catch (error) {
      console.error("Error loading saved test cases:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) return setError("Please enter some code.");

    setLoading(true);
    setError("");
    setTestCases([]);

    try {
      const response = await API.post("/api/testcase/generate", { code: code.trim() });

      // Ensure response is always an array
      const cases = Array.isArray(response.data.testCases)
        ? response.data.testCases
        : [];
      setTestCases(cases);
    } catch (error) {
      if (error.response?.status === 500 && error.response?.data?.message?.includes("Gemini API key")) {
        setError("🚨 Gemini API key not configured. Please add your API key to the backend .env file.");
      } else if (error.message?.includes("Backend server is not running")) {
        setError("🚨 Backend server is not running! Please start it first: cd backend && npm start");
      } else {
        setError(error.response?.data?.message || error.message || "Error generating test cases.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTestCase = async () => {
    if (!testCases.length) return setError("No test cases to save.");

    try {
      await API.post("/api/testcase/create", {
        functionName: "Generated Test Cases",
        input: code,
        expectedOutput: JSON.stringify(testCases, null, 2),
        description: "AI-generated test cases",
      });
      await loadSavedTestCases();
      setError("");
      alert("✅ Test cases saved successfully!");
    } catch (error) {
      setError("Error saving test cases: " + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteTestCase = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/api/testcase/${id}`);
      await loadSavedTestCases();
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Error deleting test case.");
    }
  };

  const copyToClipboard = (data) => {
    const text = typeof data === "string" ? data : JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(text);
    alert("📋 Copied to clipboard!");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">AI Test Case Generator</h1>
            <p className="text-gray-400 max-w-2xl mt-2">
              Generate comprehensive test cases for your code using AI. Paste your function and generate thorough test coverage.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <span>Logout</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="max-w-6xl mx-auto mb-6">
          <div className="bg-red-600/20 text-red-400 px-4 py-2 rounded-lg text-sm text-center">
            {error}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Code Input */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col space-y-4">
            <label htmlFor="code" className="mb-1 font-medium">Paste your code:</label>
            <textarea
              id="code"
              rows="12"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-teal-400 transition resize-none"
            />
            <div className="flex space-x-2">
              <button onClick={() => setCode("")} className="flex-1 bg-gray-600 hover:bg-gray-500 py-2 rounded-lg font-medium transition">Clear Code</button>
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading || !code.trim()}
              className="bg-teal-500 hover:bg-teal-400 py-2 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Test Cases"}
            </button>
          </div>

          {/* Generated Test Cases */}
          {testCases.length > 0 && (
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">Generated Test Cases</h3>
                <div className="flex space-x-2">
                  <button onClick={() => copyToClipboard(testCases)} className="bg-teal-500 hover:bg-teal-400 py-1 px-3 rounded-lg text-sm transition">Copy</button>
                  <button onClick={handleSaveTestCase} className="bg-gray-600 hover:bg-gray-500 py-1 px-3 rounded-lg text-sm transition">Save</button>
                </div>
              </div>
              <div className="space-y-4">
                {testCases.map((tc, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg">
                    <p className="font-semibold text-white">Test Case {index + 1}</p>
                    <p><span className="text-teal-400">Input:</span> {JSON.stringify(tc.input)}</p>
                    <p><span className="text-teal-400">Expected Output:</span> {JSON.stringify(tc.expectedOutput)}</p>
                    <p><span className="text-teal-400">Description:</span> {tc.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Saved Test Cases */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Saved Test Cases</h3>
            <button onClick={() => setShowSaved(!showSaved)} className="bg-teal-500 hover:bg-teal-400 py-1 px-3 rounded-lg text-sm transition">
              {showSaved ? "Hide" : "Show"}
            </button>
          </div>

          {showSaved && (
            <div className="space-y-4">
              {savedTestCases.length === 0 ? (
                <p className="text-gray-400 text-sm">No saved test cases yet.</p>
              ) : (
                savedTestCases.map((testCase) => (
                  <div key={testCase._id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-start space-x-4">
                    <div>
                      <h4 className="font-semibold text-white">{testCase.functionName}</h4>
                      <p className="text-gray-400 text-sm">{testCase.description}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        Created: {new Date(testCase.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button onClick={() => copyToClipboard(testCase.expectedOutput)} className="bg-teal-500 hover:bg-teal-400 py-1 px-3 rounded-lg text-sm transition">Copy</button>
                      <button onClick={() => handleDeleteTestCase(testCase._id)} className="bg-red-600 hover:bg-red-500 py-1 px-3 rounded-lg text-sm transition">Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestCasePage;
