// Importing required modules
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const accessControlRoutes = require('./routes/accessControlRoutes');
const errorHandler = require('./utils/errorHandler');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://rms-frontend-ashy.vercel.app',
  'https://my-repo-eight-omega.vercel.app',
  'https://rms-frontend-gamma.vercel.app',
 'https://repo-omega-rust.vercel.app',
 'https://rms-front-mauve.vercel.app',
 'https://front-rms.vercel.app',
 'https://rmss.vercel.app',
 'https://admin-tau-teal.vercel.app',
];

// CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true,
}));

// Middleware to parse JSON
app.use(express.json());

// Define API routes

app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/access-controls', accessControlRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
