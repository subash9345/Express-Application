const express = require('express');
const setupSwagger = require('./swagger');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db/db.js');
const cartRoutes = require('./routes/cartRoutes');
const port = process.env.PORT || 3007;;
const app = express();
app.use(cors({
  origin: '*', // allow all origins
}));
app.use(express.json());
setupSwagger(app);
connectDB();

app.use('/api/cart', cartRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
