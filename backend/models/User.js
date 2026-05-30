const pool = require('../config/database');

class User {
  static async create(userData) {
    const { email, password, name, role, company_name, phone, address } = userData;
    const query = `
      INSERT INTO users (email, password, name, role, company_name, phone, address, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      RETURNING id, email, name, role, company_name, phone, address, created_at
    `;
    const values = [email, password, name, role, company_name, phone, address];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async update(id, userData) {
    const { name, company_name, phone, address, rating } = userData;
    const query = `
      UPDATE users SET name = $1, company_name = $2, phone = $3, address = $4, rating = $5, updated_at = NOW()
      WHERE id = $6
      RETURNING *
    `;
    const values = [name, company_name, phone, address, rating, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getRating(userId) {
    const query = `
      SELECT AVG(rating) as average_rating, COUNT(*) as total_reviews
      FROM reviews
      WHERE reviewed_user_id = $1
    `;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }
}

module.exports = User;
