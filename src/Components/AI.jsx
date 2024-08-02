import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

const AI = () => {
  const [text, setText] = useState("");

  async function run() {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "tell me something about quantum computing";

    const result = await model.generateContentStream(prompt);
    // const response = await result.response;

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      console.log(chunkText);
      setText((prev) => (prev += chunkText));
    }
    // const text = response.text();
  }
  run();
  return <div>{text}</div>;
};

export default AI;
