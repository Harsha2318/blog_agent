import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { generateBlog } from './index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.post('/generate-blog', async (req, res) => {
  const { topic, exportFormat } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Missing blog topic in request body' });
  }

  try {
    const blogContent = await generateBlog(topic);

    // Export blog if requested
    let exportPath = null;
    if (exportFormat === 'md' || exportFormat === 'html') {
      const fileName = topic.toLowerCase().replace(/\s+/g, '_') + (exportFormat === 'md' ? '.md' : '.html');
      exportPath = path.join(__dirname, 'exports');
      if (!fs.existsSync(exportPath)) {
        fs.mkdirSync(exportPath);
      }
      const fullPath = path.join(exportPath, fileName);

      let contentToWrite = blogContent;
      if (exportFormat === 'html') {
        // Simple conversion from markdown to HTML (basic)
        contentToWrite = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${topic}</title>
</head>
<body>
<pre>${blogContent.replace(/</g, '<').replace(/>/g, '>')}</pre>
</body>
</html>`;
      }

      fs.writeFileSync(fullPath, contentToWrite, 'utf-8');
      exportPath = fullPath;
    }

    res.json({
      topic,
      blogContent,
      exportPath,
    });
  } catch (error) {
    console.error('Error generating blog:', error);
    res.status(500).json({ error: 'Failed to generate blog' });
  }
});

app.listen(port, () => {
  console.log(`Blog Agent API listening at http://localhost:${port}`);
});
