const express = require('express');
const pool = require('../config/database');
const router = express.Router();

router.get('/prices', async (req, res) => {
  try {
    const query = 'SELECT * FROM market_prices ORDER BY updated_at DESC LIMIT 100';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/prices/:commodity', async (req, res) => {
  try {
    const query = 'SELECT * FROM market_prices WHERE commodity = $1 ORDER BY updated_at DESC LIMIT 30';
    const result = await pool.query(query, [req.params.commodity]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/history/:commodity', async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const query = `
      SELECT * FROM market_prices
      WHERE commodity = $1 AND updated_at >= NOW() - INTERVAL '${days} days'
      ORDER BY updated_at ASC
    `;
    const result = await pool.query(query, [req.params.commodity]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
