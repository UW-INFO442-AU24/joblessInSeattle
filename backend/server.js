import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
// import cors from 'cors';
import bodyParser from 'body-parser';

// import sessions from 'express-session';
// import WebAppAuthProvider from 'msal-node-wrapper';
import apiRouter from './routes/api.js';
import models from './models.js';

// Manually resolve __dirname in ES modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  // This will give you the current directory

const app = express();
// const allowedOrigins = [
//   'http://localhost:3000',
//   'https://joblessinseattlefe.onrender.com/', 
//   'https://joblessinseattle.onrender.com/'
// ]

// // Enable CORS for specifc origins
// // This will allow all domains to access the API
// // Use CORS middleware
// app.use(cors({ 
//   origin: function(origin, callback) {
//     console.log('Request Origin:', origin);  // Log the origin for debugging
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true); // Proceed with the request
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }, // Allow requests from all
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   preflightContinue: false,
// }));

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  res.setHeader("Access-Control-Max-Age", 7200);
  next();
});

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

// Serve static files (React build output)
app.use(express.static(path.join(__dirname, '../frontend')));

// middleware to add mongoose models to req
app.use((req, res, next) => {
    req.models = models
    next()
})

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
