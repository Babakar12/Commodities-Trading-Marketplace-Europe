const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config();

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

module.exports = client;
