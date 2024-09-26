require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors'); // Import CORS
const connectDB = require('./config/db'); // Import the database connection
const authRoutes = require('./routes/authRoutes');
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
  'http://localhost:3000', // Localhost during development
  'https://rms-frontend-ashy.vercel.app' // Your Vercel frontend URL
];


// CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // Enable to pass cookies or authorization headers
}));

// Middleware to parse JSON
app.use(express.json());

// Define API routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/users', userRoutes); // User management routes
app.use('/api/roles', roleRoutes); // Role management routes
app.use('/api/access-controls', accessControlRoutes); // Access control routes

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000; // Define the port to listen on
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log server URL
});
