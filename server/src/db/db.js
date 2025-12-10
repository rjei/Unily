const { Pool } = require("pg");
const config = require("../config");

console.log("🔍 DB CONNECTION CONFIG:");
console.log("  host:", config.dbHost);
console.log("  port:", config.dbPort);
console.log("  database:", config.dbName);
console.log("  user:", config.dbUser);
console.log("  password:", config.dbPassword ? "***" : "MISSING!");

const pool = new Pool({
  host: config.dbHost,
  port: config.dbPort,
  database: config.dbName,
  user: config.dbUser,
  password: config.dbPassword,
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL database");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

module.exports = pool;
