import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  try {
    const models = await genAI.listModels();
    console.log("Available models:");
    models.forEach(model => {
      console.log(model.name);
    });
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

listModels();
