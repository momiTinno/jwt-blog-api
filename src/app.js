const experess = require("express");
const cors = require("cors");

const APP_CONSTANTS = require("./constant/app.constant");

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
app.post("/test-json", (req, res) => {
  return res.status(200).json({
    success: true,
    receivedData: req.body
  });
});

module.exports =app;
//this configures the express 

