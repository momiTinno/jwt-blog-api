const app=require("./app");
const envConfig = require("./config/env.config");

const port = envConfig.port;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//this configures the server 

//THE  listen here starts the server and listens for incoming requests on the specified port. the callback function is executed when the server starts successfully, logging a message to the console indicating that the server is running and on which port.
