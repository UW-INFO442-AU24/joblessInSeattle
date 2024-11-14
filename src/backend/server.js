import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import sessions from 'express-session';
import WebAppAuthProvider from 'msal-node-wrapper';
import apiRouter from './routes/api.js';

// Manually resolve __dirname in ES modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  // This will give you the current directory

const app = express();

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files (React build output)
app.use(express.static(path.join(__dirname, 'client/build')));

// API route for backend logic
app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Define the port and start the server
const PORT = process.env.PORT || 3000; // Use 3000 by default or from environment variable
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
