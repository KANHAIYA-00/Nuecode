import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Initialize genAI outside the function to avoid re-initialization on every call
let genAI;
let chatSession;

async function run(msg) {
  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set in environment variables!");
    return "API key not found. Please set GEMINI_API_KEY.";
  }

  if (!genAI) {
    // Initialize genAI only once
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  if (!chatSession) {
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    // Initialize the chat session only once
    chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });
  }

  try {
    const result = await chatSession.sendMessage(msg);
    const responseText = result.response.text();
    return responseText; // Return the result
  } catch (error) {
    console.error("Error in Gemini API call:", error);
    return `Error: ${error.message}`; // Return the error message
  }
}

export default run;
