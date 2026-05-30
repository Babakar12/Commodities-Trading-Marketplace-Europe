const express = require('express');
const Listing = require('../models/Listing');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { commodity_type, location, min_price, max_price } = req.query;
    const filters = { commodity_type, location, min_price, max_price };
    const listings = await Listing.getAll(filters);
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.getById(req.params.id);
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { commodity_type, quantity, unit, price_per_unit, description, location, available_from, bulk_packed } = req.body;
    const listing = await Listing.create({
      seller_id: req.user.id,
      commodity_type,
      quantity,
      unit,
      price_per_unit,
      description,
      location,
      available_from,
      bulk_packed
    });
    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const listing = await Listing.getById(req.params.id);
    if (listing.seller_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    const updated = await Listing.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const listing = await Listing.getById(req.params.id);
    if (listing.seller_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    await Listing.delete(req.params.id);
    res.json({ message: 'Listing deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
