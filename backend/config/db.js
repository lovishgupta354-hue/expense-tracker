/**
 * Database configuration - PostgreSQL connection
 * Uses environment variables for flexibility (different dev/production settings)
 */
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;