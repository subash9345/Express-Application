const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./db/db.js');
// const setupSwagger = require('./swagger');
// const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const expenseRoutes = require('./routes/expenseRoutes.js');


const app = express();
const port = 3007;

// Enable CORS for all origins (consider restricting in production)
app.use(cors({ origin: '*' }));

// Parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
connectDB();

// API routes for cart operations
// app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api/expenses', expenseRoutes);
// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));