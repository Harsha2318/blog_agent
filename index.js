import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import createPrompt from './prompts/blogPrompt.js';
import { generateImageMarkdown } from './imageGenerator.js';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function generateBlog(topic) {
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  const prompt = createPrompt(topic);

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let blogPost = response.text();

    // Append generated image markdown
    const imageMarkdown = generateImageMarkdown(topic);
    blogPost += `\n\n${imageMarkdown}`;

    return blogPost;
  } catch (err) {
    console.error("❌ Error generating blog:", err);
    throw err;
  }
}

// Run from CLI
if (process.argv[1].endsWith('index.js')) {
  const topic = process.argv[2] || "Quantum Computing for Beginners";
  generateBlog(topic).then(blogPost => {
    console.log("\n📝 Generated Blog Post:\n");
    console.log(blogPost);
  }).catch(err => {
    process.exit(1);
  });
}
