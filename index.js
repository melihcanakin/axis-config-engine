require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/v1/config', require('./routes/api/config'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'AXIS Config Engine is running',
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║        AXIS Config Engine v1.0.0                      ║
║        Server running on port ${PORT}                      ║
║                                                       ║
║        Developed by Melihcan Akın                     ║
║        Smart Yazılım - www.smartyazilim.com.tr        ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});
