"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Home, Sparkle, Sparkles } from "lucide-react";
import { Textarea } from "./ui/textarea";
import usePost from "@/lib/usePost";
import UserDescription from "./user-description";
import { ModeToggle } from "./ui/mode-toggle";
import UserSettings from "./user-settings";
import { Input } from "./ui/input";
import { GoogleGenerativeAI } from "@google/generative-ai";

type Props = {};

const Sidebar = (props: Props) => {
  const { contentObject, setContentObject } = usePost();

  const [jsonInput, setJsonInput] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleInputChange = (e: any) => {
    setJsonInput(e.target.value);
  };

  const handleCreatePost = () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      setContentObject(parsedInput);
      document.title = parsedInput.title;
    } catch (e) {
      alert("Invalid JSON format");
    }
  };

  function handleTopicInput(e: any) {
    setTopic(e.target.value);
  }

  const fetchStory = async () => {
    try {
      setIsGenerating(true);
      setJsonInput("");
      // Initialize the Google Generative AI client
      const genAI = new GoogleGenerativeAI(
        process.env.NEXT_PUBLIC_AI_API_KEY as string
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
  Please generate a LinkedIn post in the following structured object format:

  {
    "title": "string",
    "description": "string",
    "hashtags": ["string"],
    "content": [
      {
        "name": "string",
        "description": "string",
        "codeLang": "string",
        "code": "string"
      }
    ]
  }

  Make sure to follow this format strictly and return **only** a valid JSON object with no additional text, no line breaks outside of string values, and no trailing commas. If a field is not applicable, use an empty string for "title", "description", or "code", and an empty array for "hashtags" or "content". Ensure proper JSON syntax throughout.

  The topic of the LinkedIn post is: ${topic}.
`;

      const result = await model.generateContentStream(prompt);

      // Stream the result and update the state as chunks arrive
      for await (const chunk of result.stream) {
        setJsonInput((prevStory) => prevStory + chunk.text());
      }
      setIsGenerating(false);
    } catch (error) {
      console.error("Error fetching the story:", error);
    }
  };

  return (
    <aside className="flex flex-col p-4">
      <div className="mb-3 flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <Link href={"/"}>
            <Button variant="secondary" size="icon">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Post Maker</h1>
        </div>
        <div className="flex gap-2">
          <UserSettings />
          <ModeToggle />
        </div>
      </div>
      <div className="flex gap-2 mb-3">
        <Input
          disabled={isGenerating}
          type="text"
          placeholder="Enter you topic..."
          onChange={handleTopicInput}
        />
        <Button onClick={fetchStory} disabled={isGenerating}>
          <Sparkles strokeWidth={1} className="mr-1" height={17} width={17} />
          {isGenerating ? "Generating..." : "Generate"}{" "}
        </Button>
      </div>
      <Textarea
        disabled={isGenerating}
        className="p-2 min-h-32"
        value={jsonInput}
        onChange={handleInputChange}
        placeholder={`Input Json Data`}
      />
      <div className="mt-3 gap-1">
        <Button className="" onClick={handleCreatePost}>
          Create Post
        </Button>
      </div>
      <UserDescription contentObject={contentObject} />
    </aside>
  );
};

export default Sidebar;
