const express = require('express');
const { calculateShippingCost, calculateFuelCost, calculateProfitMargin, calculateDistance, calculateROI, calculateCOGS, calculateBreakEven } = require('../utils/calculators');

const router = express.Router();

router.post('/shipping-cost', (req, res) => {
  try {
    const { weight, distance, cargo_type } = req.body;
    const cost = calculateShippingCost(weight, distance, cargo_type);
    res.json({ shippingCost: cost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/fuel-cost', (req, res) => {
  try {
    const { distance, fuel_price, consumption } = req.body;
    const cost = calculateFuelCost(distance, fuel_price, consumption);
    res.json({ fuelCost: cost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/profit-margin', (req, res) => {
  try {
    const { cost_price, selling_price } = req.body;
    const result = calculateProfitMargin(cost_price, selling_price);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/distance', (req, res) => {
  try {
    const { lat1, lon1, lat2, lon2 } = req.body;
    const distance = calculateDistance(lat1, lon1, lat2, lon2);
    res.json({ distance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/roi', (req, res) => {
  try {
    const { initial_investment, profit } = req.body;
    const result = calculateROI(initial_investment, profit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/cogs', (req, res) => {
  try {
    const { material_cost, labor_cost, overhead_cost } = req.body;
    const cogs = calculateCOGS(material_cost, labor_cost, overhead_cost);
    res.json({ cogs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/break-even', (req, res) => {
  try {
    const { fixed_costs, variable_cost_per_unit, selling_price_per_unit } = req.body;
    const breakEven = calculateBreakEven(fixed_costs, variable_cost_per_unit, selling_price_per_unit);
    res.json({ breakEvenQuantity: breakEven });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
