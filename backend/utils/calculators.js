/**
 * Shipping Cost Calculator
 * @param {number} weight - Weight in kg
 * @param {number} distance - Distance in km
 * @param {string} cargoType - Type of cargo
 * @returns {number} - Calculated shipping cost
 */
function calculateShippingCost(weight, distance, cargoType) {
  const baseCostPerKm = 0.5;
  const weightMultiplier = weight / 100; // per 100kg
  const cargoMultipliers = {
    'general': 1.0,
    'machinery': 1.5,
    'seafood': 2.0,
    'hazmat': 3.0,
    'timber': 0.8
  };

  const multiplier = cargoMultipliers[cargoType] || 1.0;
  const baseCost = baseCostPerKm * distance * weightMultiplier * multiplier;
  const handlingFee = baseCost * 0.1; // 10% handling fee
  const totalCost = baseCost + handlingFee;

  return Math.round(totalCost * 100) / 100;
}

/**
 * Fuel Cost Calculator
 * @param {number} distance - Distance in km
 * @param {number} fuelPrice - Fuel price per liter
 * @param {number} consumption - Fuel consumption per 100km
 * @returns {number} - Calculated fuel cost
 */
function calculateFuelCost(distance, fuelPrice, consumption = 25) {
  const fuelNeeded = (distance / 100) * consumption;
  return Math.round(fuelNeeded * fuelPrice * 100) / 100;
}

/**
 * Profit Margin Calculator
 * @param {number} costPrice - Cost price
 * @param {number} sellingPrice - Selling price
 * @returns {object} - Profit margin details
 */
function calculateProfitMargin(costPrice, sellingPrice) {
  const profit = sellingPrice - costPrice;
  const marginPercent = (profit / sellingPrice) * 100;
  const markupPercent = (profit / costPrice) * 100;

  return {
    profit,
    marginPercent: Math.round(marginPercent * 100) / 100,
    markupPercent: Math.round(markupPercent * 100) / 100
  };
}

/**
 * Distance Calculator (Haversine formula)
 * @param {number} lat1 - Starting latitude
 * @param {number} lon1 - Starting longitude
 * @param {number} lat2 - Ending latitude
 * @param {number} lon2 - Ending longitude
 * @returns {number} - Distance in km
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 100) / 100;
}

/**
 * ROI Calculator
 * @param {number} initialInvestment - Initial investment
 * @param {number} profit - Profit earned
 * @returns {object} - ROI details
 */
function calculateROI(initialInvestment, profit) {
  const roi = (profit / initialInvestment) * 100;
  return {
    roi: Math.round(roi * 100) / 100,
    profitPercentage: Math.round(roi * 100) / 100,
    breakEvenMultiple: Math.round((initialInvestment / profit) * 100) / 100
  };
}

/**
 * Total Cost of Goods Sold (COGS)
 * @param {number} materialCost - Material cost
 * @param {number} laborCost - Labor cost
 * @param {number} overheadCost - Overhead cost
 * @returns {number} - Total COGS
 */
function calculateCOGS(materialCost, laborCost, overheadCost) {
  return materialCost + laborCost + overheadCost;
}

/**
 * Break-even Analysis
 * @param {number} fixedCosts - Fixed costs
 * @param {number} variableCostPerUnit - Variable cost per unit
 * @param {number} sellingPricePerUnit - Selling price per unit
 * @returns {number} - Break-even quantity
 */
function calculateBreakEven(fixedCosts, variableCostPerUnit, sellingPricePerUnit) {
  return fixedCosts / (sellingPricePerUnit - variableCostPerUnit);
}

module.exports = {
  calculateShippingCost,
  calculateFuelCost,
  calculateProfitMargin,
  calculateDistance,
  calculateROI,
  calculateCOGS,
  calculateBreakEven
};
