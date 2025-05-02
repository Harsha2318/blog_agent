import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogAgent';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const blogPostSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const BlogPost = mongoose.model('BlogPost', blogPostSchema);
