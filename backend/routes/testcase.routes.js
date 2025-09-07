import express from "express";
import authMiddleware from "../middleware/auth.js";
import TestCase from "../models/testcase.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

/**
 * CREATE Test Case
 */
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { functionName, input, expectedOutput, description } = req.body;

    if (!functionName || !input || !expectedOutput) {
      return res
        .status(400)
        .json({ message: "functionName, input and expectedOutput are required" });
    }

    const newTestCase = await TestCase.create({
      user: req.user.id, // from JWT
      functionName,
      input,
      expectedOutput,
      description,
    });

    res.status(201).json(newTestCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * READ all Test Cases for logged-in user
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const testCases = await TestCase.find({ user: req.user.id });
    res.json(testCases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * UPDATE a Test Case
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { functionName, input, expectedOutput, description } = req.body;

    const updatedTestCase = await TestCase.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { functionName, input, expectedOutput, description },
      { new: true }
    );

    if (!updatedTestCase)
      return res.status(404).json({ message: "TestCase not found" });

    res.json(updatedTestCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * DELETE a Test Case
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await TestCase.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });
    if (!deleted)
      return res.status(404).json({ message: "TestCase not found" });

    res.json({ message: "TestCase deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * GENERATE Test Cases using AI
 */
router.post("/generate", authMiddleware, async (req, res) => {
  try {
    const { code } = req.body;

    // Validate input
    if (!code || code.trim().length < 5) {
      return res.status(400).json({ message: "Please enter a valid code." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        message: "Gemini API key not configured. Please add your API key to the .env file.",
      });
    }

    // Auto-detect language
    let language = "javascript";
    if (code.includes("def ") || code.includes("print(")) language = "python";
    else if (code.includes("public class") || code.includes("System.out"))
      language = "java";
    else if (code.includes("#include") || code.includes("std::")) language = "cpp";

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const prompt = `Generate at least 5 diverse test cases for the following ${language} function.
Return ONLY valid JSON in this structure:
[
  {
    "input": "function input here",
    "expectedOutput": "expected output here",
    "description": "short description of what this test is checking"
  }
]

Code:
\`\`\`${language}
${code}
\`\`\``;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let generatedTestCases = response.text().trim();

    // Clean markdown artifacts
    generatedTestCases = generatedTestCases.replace(/```json|```/g, "").trim();

    // Extract JSON array if AI adds extra text
    const jsonMatch = generatedTestCases.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return res.status(502).json({ message: "AI did not return valid JSON." });
    }

    let parsedTestCases;
    try {
      parsedTestCases = JSON.parse(jsonMatch[0]);
    } catch (err) {
      return res.status(502).json({ message: "Failed to parse AI response as JSON." });
    }

    res.json({ testCases: parsedTestCases, language });
  } catch (error) {
    res.status(500).json({
      message: "Error generating test cases. Please try again.",
      error: error.message,
    });
  }
});

export default router;
