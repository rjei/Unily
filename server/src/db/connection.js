const { Pool } = require("pg");
const config = require("../config");

// Pool PostgreSQL - support DATABASE_URL atau individual vars
const poolConfig = config.databaseUrl
  ? {
      connectionString: config.databaseUrl,
      ssl: {
        rejectUnauthorized: false, // Required untuk Supabase
      },
    }
  : {
      host: config.dbHost,
      port: config.dbPort,
      database: config.dbName,
      user: config.dbUser,
      password: config.dbPassword,
    };

const pool = new Pool(poolConfig);

// Logging
pool.on("connect", () => {
  const dbInfo = config.databaseUrl
    ? `DATABASE_URL (${config.dbHost})`
    : `${config.dbHost}:${config.dbPort}/${config.dbName}`;
  console.log(`✅ PostgreSQL Connected → ${dbInfo}`);
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
