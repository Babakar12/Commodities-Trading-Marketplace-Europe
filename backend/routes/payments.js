const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { authenticateToken } = require('../middleware/auth');
const pool = require('../config/database');

const router = express.Router();

router.post('/create-payment-intent', authenticateToken, async (req, res) => {
  try {
    const { amount, currency = 'eur', order_id } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: { order_id, user_id: req.user.id }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/confirm-payment', authenticateToken, async (req, res) => {
  try {
    const { payment_intent_id, order_id } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);

    if (paymentIntent.status === 'succeeded') {
      // Update order status in database
      await pool.query('UPDATE orders SET status = $1 WHERE id = $2', ['paid', order_id]);
      res.json({ success: true, message: 'Payment confirmed' });
    } else {
      res.status(400).json({ error: 'Payment not completed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
