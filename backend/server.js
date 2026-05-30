const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const http = require('http');
const socketIO = require('socket.io');
const pool = require('./config/database');
const logger = require('./utils/logger');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/listings', require('./routes/listings'));
app.use('/api/market', require('./routes/market'));
app.use('/api/calculators', require('./routes/calculators'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/shipping', require('./routes/shipping'));

// Start market data scheduler
const { startMarketDataScheduler } = require('./schedulers/marketData');
startMarketDataScheduler();

// Socket.io events
io.on('connection', (socket) => {
  logger.info(`New client connected: ${socket.id}`);
  
  socket.on('subscribe_prices', (commodity) => {
    socket.join(`price_${commodity}`);
    logger.info(`Client subscribed to ${commodity}`);
  });
  
  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

// Store io instance for use in routes
app.set('io', io);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(err.status || 500).json({
    error: err.message,
    status: err.status || 500
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Database connection check
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    logger.error('Database connection failed:', err);
  } else {
    logger.info('Database connected successfully');
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = { app, server, io };
