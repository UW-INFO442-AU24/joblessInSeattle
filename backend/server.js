import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

// import sessions from 'express-session';
// import WebAppAuthProvider from 'msal-node-wrapper';
import apiRouter from './routes/api.js';

// Manually resolve __dirname in ES modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  // This will give you the current directory

const app = express();

// Enable CORS for all origins
// This will allow all domains to access the API
app.use(cors());

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files (React build output)
app.use(express.static(path.join(__dirname, '../frontend')));

// API route for backend logic
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  try {
    console.log("it connected");
    res.status(200).json({ message: "Success!!" });
  }
  catch(error) {
    console.log("Error: ", error);
    res.status(500).json({status: "error", error: error});
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend'));
});

// Define the port and start the server
const PORT = process.env.PORT || 3001; // Use 3001 by default or from environment variable
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;