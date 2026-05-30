const express = require('express');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.id !== parseInt(req.params.id)) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    const user = await User.update(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/ratings', async (req, res) => {
  try {
    const rating = await User.getRating(req.params.id);
    res.json(rating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
