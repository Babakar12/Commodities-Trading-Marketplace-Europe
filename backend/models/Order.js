const pool = require('../config/database');

class Order {
  static async create(orderData) {
    const { buyer_id, seller_id, listing_id, quantity, total_price, shipping_method, payment_method, status } = orderData;
    const query = `
      INSERT INTO orders (buyer_id, seller_id, listing_id, quantity, total_price, shipping_method, payment_method, status, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
      RETURNING *
    `;
    const values = [buyer_id, seller_id, listing_id, quantity, total_price, shipping_method, payment_method, status || 'pending'];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getById(id) {
    const query = 'SELECT * FROM orders WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async updateStatus(id, status) {
    const query = `
      UPDATE orders SET status = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `;
    const result = await pool.query(query, [status, id]);
    return result.rows[0];
  }

  static async getByBuyer(buyerId) {
    const query = 'SELECT * FROM orders WHERE buyer_id = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [buyerId]);
    return result.rows;
  }

  static async getBySeller(sellerId) {
    const query = 'SELECT * FROM orders WHERE seller_id = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [sellerId]);
    return result.rows;
  }
}

module.exports = Order;
