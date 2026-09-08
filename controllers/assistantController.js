// controllers/assistantController.js

const axios = require("axios");
const pool = require("../db/pool");
const geminiModel = process.env.GEMINI_MODEL || "gemini-3.6-flash";

const askAssistant = async (req, res) => {
  try {
    const question = String(req.body.question || "").trim();

    if (!question) {
      return res.status(400).json({ answer: "Please enter a question." });
    }

    const result = await pool.query(`
      SELECT issue_type, severity, description, status, created_at
      FROM reports
      ORDER BY created_at DESC
      LIMIT 100
    `);

    const prompt = `
You are a road-report assistant. Answer the user's question using only the
database reports below. If the reports do not contain the answer, say so.
Keep the answer concise and clear.

User question: ${question}
Reports: ${JSON.stringify(result.rows)}
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent`,
      { contents: [{ parts: [{ text: prompt }] }] },
      { params: { key: process.env.GEMINI_API_KEY } }
    );

    const answer = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    res.json({ answer: answer || "Gemini returned no answer." });
  } catch (error) {
    console.error("Gemini assistant error:", error.response?.data || error.message);
    res.status(500).json({
      answer: "The AI assistant is unavailable. Check your Gemini API key and server logs."
    });
  }
};

module.exports = { askAssistant };