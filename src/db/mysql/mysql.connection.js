const mysql = require('mysql2/promise');

const envConfig = require('../../config/env.config');

const pool = mysql.createPool({
  host: envConfig.database.host,
  port: envConfig.database.port,
  user: envConfig.database.user,
  password: envConfig.database.password,
  database: envConfig.database.name,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
