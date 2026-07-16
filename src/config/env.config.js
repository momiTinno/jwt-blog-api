require("dotenv").config();

const requiredEnvironmentVariables = [
  "DB_HOST",
  "DB_USER",
  "DB_NAME",
  "JWT_SECRET"
];

function validateEnvironmentVariables() {
  const missingVariables = requiredEnvironmentVariables.filter(
    (variableName) => !process.env[variableName]
  );

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVariables.join(", ")}`
    );
  }
}

validateEnvironmentVariables();

const envConfig = Object.freeze({
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,

  database: Object.freeze({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || "",
    name: process.env.DB_NAME
  }),

  jwt: Object.freeze({
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "1d"
  })
});

module.exports = envConfig;