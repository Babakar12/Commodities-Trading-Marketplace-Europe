const express = require('express');
const Order = require('../models/Order');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { seller_id, listing_id, quantity, total_price, shipping_method, payment_method } = req.body;
    const order = await Order.create({
      buyer_id: req.user.id,
      seller_id,
      listing_id,
      quantity,
      total_price,
      shipping_method,
      payment_method,
      status: 'pending'
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.getById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.updateStatus(req.params.id, status);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/buyer/orders', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.getByBuyer(req.user.id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/seller/orders', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.getBySeller(req.user.id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
