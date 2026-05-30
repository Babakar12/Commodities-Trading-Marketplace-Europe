const pool = require('../config/database');

class Listing {
  static async create(listingData) {
    const { seller_id, commodity_type, quantity, unit, price_per_unit, description, location, available_from, bulk_packed } = listingData;
    const query = `
      INSERT INTO listings (seller_id, commodity_type, quantity, unit, price_per_unit, description, location, available_from, bulk_packed, created_at, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), 'active')
      RETURNING *
    `;
    const values = [seller_id, commodity_type, quantity, unit, price_per_unit, description, location, available_from, bulk_packed];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getAll(filters = {}) {
    let query = 'SELECT * FROM listings WHERE status = \'active\'';
    const values = [];
    let paramCount = 1;

    if (filters.commodity_type) {
      query += ` AND commodity_type = $${paramCount}`;
      values.push(filters.commodity_type);
      paramCount++;
    }

    if (filters.location) {
      query += ` AND location ILIKE $${paramCount}`;
      values.push(`%${filters.location}%`);
      paramCount++;
    }

    if (filters.min_price) {
      query += ` AND price_per_unit >= $${paramCount}`;
      values.push(filters.min_price);
      paramCount++;
    }

    if (filters.max_price) {
      query += ` AND price_per_unit <= $${paramCount}`;
      values.push(filters.max_price);
      paramCount++;
    }

    query += ' ORDER BY created_at DESC LIMIT 50';
    const result = await pool.query(query, values);
    return result.rows;
  }

  static async getById(id) {
    const query = 'SELECT * FROM listings WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async update(id, updateData) {
    const { quantity, price_per_unit, description, status } = updateData;
    const query = `
      UPDATE listings SET quantity = $1, price_per_unit = $2, description = $3, status = $4, updated_at = NOW()
      WHERE id = $5
      RETURNING *
    `;
    const values = [quantity, price_per_unit, description, status, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'UPDATE listings SET status = \'deleted\', updated_at = NOW() WHERE id = $1';
    await pool.query(query, [id]);
  }
}

module.exports = Listing;
