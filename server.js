import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { generateBlog } from './index.js';
import { BlogPost } from './db.js';
import MarkdownIt from 'markdown-it';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(bodyParser.json());

app.options('*', cors());

const md = new MarkdownIt();

app.post('/generate-blog', async (req, res) => {
  const { topic, exportFormat } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Missing blog topic in request body' });
  }

  try {
    const blogContent = await generateBlog(topic);

    // Save blog content to MongoDB
    const blogPost = new BlogPost({
      topic,
      content: blogContent,
    });

    const savedPost = await blogPost.save();

    res.json({
      id: savedPost._id,
      topic: savedPost.topic,
      blogContent: savedPost.content,
      createdAt: savedPost.createdAt,
    });
  } catch (error) {
    console.error('Error generating blog:', error);
    res.status(500).json({ error: 'Failed to generate blog' });
  }
});

app.listen(port, () => {
  console.log(`Blog Agent API listening at http://localhost:${port}`);
});
