import axios from "axios";

export const analyzeCode = async (code, language) => {
  try {
    const prompt = `
You are an expert ${language} developer.

Analyze the following ${language} code and provide:

1. Bugs (language-specific issues)
2. Suggestions (best practices for ${language})
3. Improvements (performance/readability in ${language})
4. Score out of 100

IMPORTANT:
- Respond ONLY in JSON
- Do NOT include any explanation outside JSON

Format:
{
  "issues": [],
  "suggestions": [],
  "improvements": [],
  "score": number
}

Code:
${code}
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
    );

    // 🔥 LOG FULL RESPONSE
    console.log("FULL AI RESPONSE:", JSON.stringify(response.data, null, 2));

    const text = response.data.candidates[0].content.parts[0].text;

    // 🔥 LOG RAW TEXT
    console.log("AI TEXT OUTPUT:", text);

    // Try parsing JSON
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.log("JSON PARSE ERROR:", parseError.message);

      return {
        issues: ["Parsing error"],
        suggestions: [text],
        improvements: [],
        score: 70,
      };
    }
  } catch (error) {
    // 🔥 LOG ERROR
    console.log("AI ERROR:", error.message);

    // If API gives response error
    if (error.response) {
      console.log("API ERROR DATA:", error.response.data);
    }

    return {
      issues: ["AI service error"],
      suggestions: [],
      improvements: [],
      score: 50,
    };
  }
};




export const predictOutputAI = async (code, language) => {
  try {
    const prompt = `
You are an expert ${language} developer.

Predict the output of this code EXACTLY.

If error:
- clearly explain the error

Keep answer clean and short.

Code:
${code}
`;
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    return {
      output:
        response.data.candidates[0].content.parts[0].text,
    };

  } catch (error) {
    console.log("PREDICT ERROR:", error.message);

    return {
      error: "Failed to generate output",
    };
  }
};


