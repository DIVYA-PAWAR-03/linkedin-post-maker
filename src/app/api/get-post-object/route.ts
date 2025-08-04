import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a professional LinkedIn content creator. Generate a comprehensive LinkedIn post about "${topic}" in the exact JSON format specified below.

REQUIREMENTS:
1. Create engaging, professional LinkedIn content
2. Include practical insights, tips, or actionable advice
3. Use a conversational yet professional tone
4. Generate exactly 3 content sections minimum
5. Include relevant hashtags (5-10 hashtags)
6. Ensure content is valuable for professionals

OUTPUT FORMAT:
Return ONLY a valid JSON object with this exact structure:

{
  "title": "Compelling post title",
  "description": "Engaging post description that hooks readers",
  "hashtags": ["#RelevantHashtag1", "#RelevantHashtag2", "#RelevantHashtag3"],
  "content": [
    {
      "name": "Section title or key point",
      "description": "Detailed explanation or insight",
      "codeLang": "programming language if code example, otherwise empty string",
      "code": "code snippet if applicable, otherwise empty string"
    }
  ]
}

CONTENT GUIDELINES:
- title: Should be attention-grabbing and summarize the main value
- description: Should engage readers, provide context, and encourage interaction
- hashtags: Include mix of popular and niche-specific hashtags
- content: Each object should represent a key point, tip, or insight
- For technical topics: ALWAYS include practical code examples where relevant
- For programming/development topics: Provide actual working code snippets
- For non-technical topics: Focus on actionable insights and strategies
- Code examples should be concise but complete and functional
- Use appropriate programming languages based on the topic context

WHEN TO INCLUDE CODE:
- Programming tutorials or tips
- Software development best practices
- API usage examples
- Configuration examples
- Algorithm explanations
- Framework or library demonstrations
- Any technical concept that benefits from code illustration

CODE EXAMPLE REQUIREMENTS:
- Provide real, working code snippets
- Use proper syntax highlighting with correct language specification
- Keep code concise but functional (5-20 lines typically)
- Include comments in code when helpful
- Choose the most relevant programming language for the topic

JSON RULES:
- Return raw JSON only (no markdown code blocks)
- No trailing commas
- Use double quotes for all strings
- Escape special characters properly in code snippets
- For technical topics: Include actual code examples with proper language specification
- If no code is applicable: use empty string for "code" and "codeLang"
- Code should be properly escaped JSON strings (use \\n for line breaks, \\" for quotes)

CRITICAL: Do NOT wrap your response in \`\`\`json \`\`\` or any other markdown formatting. Start your response directly with { and end with }. Your entire response should be valid JSON that can be parsed immediately.

EXAMPLE OUTPUT (start your response exactly like this):
{
  "title": "Your actual title here",
  "description": "Your actual description here",
  "hashtags": ["#TechTips", "#Programming"],
  "content": [
    {
      "name": "Key Point 1",
      "description": "Explanation of the concept",
      "codeLang": "javascript",
      "code": "const example = () => {\\n  return 'Hello World';\\n};"
    }
  ]
}

Topic: ${topic}

Start your JSON response now:`;

    const result = await model.generateContentStream(prompt);

    // Create a readable stream
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            controller.enqueue(new TextEncoder().encode(text));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
