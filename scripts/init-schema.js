const fs = require('node:fs/promises');
const path = require('node:path');

const pool = require('../src/db/mysql/mysql.connection');

async function initializeSchema() {
  const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
  const schemaSql = await fs.readFile(schemaPath, 'utf8');
  const statements = schemaSql
    .split(';')
    .map((statement) => statement.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await pool.execute(statement);
  }

  console.log('Database schema initialized successfully');
  await pool.end();
}

initializeSchema().catch(async (error) => {
  console.error('Failed to initialize schema:', error.message);
  await pool.end();
  process.exit(1);
});
