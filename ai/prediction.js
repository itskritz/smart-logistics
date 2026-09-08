// ai/prediction.js

const axios = require("axios");

const geminiModel = process.env.GEMINI_MODEL || "gemini-3.6-flash";

const predictRoute = async (pool, start, destination) => {
  const reportsResult = await pool.query(`
    SELECT issue_type, severity, description, status, created_at
    FROM reports
    WHERE status IN ('PENDING', 'RESOLVED')
    ORDER BY created_at DESC
    LIMIT 50
  `);

  const prompt = `
You are a logistics route-risk analyst. Analyze the route and road reports below.
Return only valid JSON with these keys:
recommendedRoute (string), distance (number), estimatedTime (number),
riskLevel (one of LOW, MEDIUM, HIGH, BLOCKED), blocked (boolean),
confidence (number from 0 to 100), reason (string).

Start: ${start}
Destination: ${destination}
Reports: ${JSON.stringify(reportsResult.rows)}
`;

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent`,
    {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    },
    {
      params: { key: process.env.GEMINI_API_KEY }
    }
  );

  const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini returned no route prediction");
  }

  const prediction = JSON.parse(text);

  return {
    recommendedRoute: prediction.recommendedRoute || `${start} -> ${destination}`,
    distance: Number(prediction.distance) || 0,
    estimatedTime: Number(prediction.estimatedTime) || 0,
    riskLevel: prediction.riskLevel || "MEDIUM",
    blocked: Boolean(prediction.blocked),
    confidence: Number(prediction.confidence) || 0,
    reason: prediction.reason || "No reason provided by Gemini"
  };
};

module.exports = predictRoute;