const cron = require('node-cron');
const axios = require('axios');
const pool = require('../config/database');
const logger = require('../utils/logger');

const commodities = [
  { name: 'Bauxite', symbol: 'AL' },
  { name: 'Limestone', symbol: 'LIME' },
  { name: 'Seafood', symbol: 'SEAFOOD' },
  { name: 'Timber', symbol: 'TIMBER' },
  { name: 'Gold', symbol: 'XAUUSD' },
  { name: 'Copper', symbol: 'XCUUSD' },
  { name: 'Oil', symbol: 'XTIUSD' }
];

// Mock market data function - Replace with real API calls
async function fetchMarketData() {
  logger.info('Fetching market data...');
  
  for (const commodity of commodities) {
    try {
      // Mock data - Replace with actual API calls
      const price = Math.random() * 1000 + 100;
      const change = (Math.random() - 0.5) * 10;
      const changePercent = (change / price) * 100;

      // Store in database
      const query = `
        INSERT INTO market_prices (commodity, price, change, change_percent, currency, updated_at)
        VALUES ($1, $2, $3, $4, 'EUR', NOW())
      `;
      await pool.query(query, [commodity.name, price, change, changePercent]);

      logger.info(`Updated ${commodity.name}: €${price.toFixed(2)}`);
    } catch (error) {
      logger.error(`Error fetching ${commodity.name}:`, error.message);
    }
  }
}

// Schedule market data updates every 3 minutes
function startMarketDataScheduler() {
  // Run immediately
  fetchMarketData();

  // Then run every 3 minutes
  cron.schedule('*/3 * * * *', () => {
    fetchMarketData();
  });

  logger.info('Market data scheduler started (updates every 3 minutes)');
}

module.exports = { startMarketDataScheduler, fetchMarketData };
