const experess = require("express");
const cors = require("cors");

const APP_CONSTANTS = require("./constant/app.constant");

const notFoundMiddleware = require("./middleware/not-found.middleware");

const errorMiddleware = require("./middleware/error.middleware");

app = experess();

app.use(cors());

app.use(experess.json());

app.get(APP_CONSTANTS.HEALTH_ROUTE, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running"
  });
}
);





app.use(notFoundMiddleware);


app.use(errorMiddleware);

module.exports = app;

//this configures the express 

