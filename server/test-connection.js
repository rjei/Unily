require("dotenv").config({ path: ".env" });
const { Pool } = require("pg");

console.log("🔍 Testing Database Connection...\n");
console.log("Environment Variables:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log(
  "DB_PASSWORD:",
  process.env.DB_PASSWORD ? "***HIDDEN***" : "MISSING!"
);

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool
  .query("SELECT current_database(), current_user;")
  .then((result) => {
    console.log("\n✅ CONNECTION SUCCESS!");
    console.log("Database:", result.rows[0].current_database);
    console.log("User:", result.rows[0].current_user);

    // Test user query
    return pool.query(
      "SELECT email, LENGTH(password) FROM users WHERE email='budi@mhs.usu.ac.id'"
    );
  })
  .then((result) => {
    console.log("\n✅ USER QUERY SUCCESS!");
    console.log("Email:", result.rows[0].email);
    console.log("Password Length:", result.rows[0].length);
    pool.end();
  })
  .catch((err) => {
    console.error("\n❌ CONNECTION FAILED!");
    console.error("Error:", err.message);
    console.error("Code:", err.code);
    pool.end();
  });
