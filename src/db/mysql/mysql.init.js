const pool = require("./mysql.connection");

async function initializeDatabase() {
  let connection;

  try {
    connection = await pool.getConnection();

    const [rows] = await connection.query(
      "SELECT 1 AS connection_test"
    );

    if (rows[0].connection_test !== 1) {
      throw new Error("Database connection test failed");
    }

    console.log("MySQL database connected successfully");
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = initializeDatabase;