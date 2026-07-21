const express = require('express');
const cors = require('cors');
const APP_CONSTANTS = require('./constant/app.constant');
const HTTP_STATUS = require('./constant/http-status.constant');
const notFoundMiddleware = require('./middleware/not-found.middleware');
const errorMiddleware = require('./middleware/error.middleware');
const authRoutes = require('./modules/auth/auth.routes');
const blogRoutes = require('./modules/blog/blog.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get(APP_CONSTANTS.HEALTH_ROUTE, (req, res) => {
  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Server is running',
  });
});

app.use(`${APP_CONSTANTS.API_PREFIX}/auth`, authRoutes);
app.use(`${APP_CONSTANTS.API_PREFIX}/blogs`, blogRoutes);

app.use(notFoundMiddleware.handle);
app.use(errorMiddleware.handle);

module.exports = app;
