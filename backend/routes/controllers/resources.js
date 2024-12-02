import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const router = express.Router();

const API_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = process.env.NEWS_API_KEY; // Ensure your API key is stored securely

console.log('API_KEY:', API_KEY);
router.get('/health', async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        country: 'us',
        category: 'health',
        apiKey: API_KEY,
      },
    });

    res.json({ articles: response.data.articles });; // Send the articles to the frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

export default router;