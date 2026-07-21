const app = require('./app');
const envConfig = require('./config/env.config');
const initializeDatabase = require('./db/mysql/mysql.init');

async function startServer() {
  try {
    await initializeDatabase();

    app.listen(envConfig.port, () => {
      console.log(`Server is running at http://localhost:${envConfig.port}`);
    });
  } catch (error) {
    console.error('Failed to start the application:', error.message);

    process.exit(1);
  }
}

startServer();
