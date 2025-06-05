const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./db/db.js');
// const setupSwagger = require('./swagger');
const cartRoutes = require('./routes/cartRoutes');
const expressOasGenerator = require('express-oas-generator');
const app = express();
const port = process.env.PORT || 3007;

// Enable CORS for all origins (consider restricting in production)
app.use(cors({ origin: '*' }));

// Parse incoming JSON requests
app.use(express.json());
expressOasGenerator.init(app, {
  ignoredNodeEnvironments: ['production', 'test', 'staging'], // your envs where you want it disabled
  swaggerUiPath: '/swagger'
});

// Connect to MongoDB
connectDB();

// API routes for cart operations
app.use('/api/cart', cartRoutes);

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));