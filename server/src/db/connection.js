const { Pool } = require("pg");
const config = require("../config");

// Pool PostgreSQL pakai config resmi
const pool = new Pool({
  host: config.dbHost,
  port: config.dbPort,
  database: config.dbName,
  user: config.dbUser,
  password: config.dbPassword,
});

// Logging
pool.on("connect", () => {
  console.log(`✅ PostgreSQL Connected → ${config.dbHost}:${config.dbPort}/${config.dbName}`);
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL client error:", err);
  process.exit(-1);
});

// Query wrapper
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
