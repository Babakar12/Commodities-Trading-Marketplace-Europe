const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/quotes', async (req, res) => {
  try {
    const { origin, destination, weight, cargo_type } = req.body;
    
    // Get shipping quotes from logistics providers
    const query = `
      SELECT * FROM shipping_providers
      WHERE service_areas @> $1
      ORDER BY base_rate ASC
    `;
    const result = await pool.query(query, [JSON.stringify([origin, destination])]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/track/:shipment_id', async (req, res) => {
  try {
    const query = 'SELECT * FROM shipments WHERE id = $1';
    const result = await pool.query(query, [req.params.shipment_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Shipment not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/create-shipment', authenticateToken, async (req, res) => {
  try {
    const { order_id, shipping_provider_id, pickup_date, delivery_date } = req.body;
    const query = `
      INSERT INTO shipments (order_id, shipping_provider_id, pickup_date, delivery_date, status, created_at)
      VALUES ($1, $2, $3, $4, 'pending', NOW())
      RETURNING *
    `;
    const result = await pool.query(query, [order_id, shipping_provider_id, pickup_date, delivery_date]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.module = router;
