const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const routes = require("./app.routes");
const cors = require("cors");

// Connecting to mongodb
require("./config/database.config");

// Enable cors
var corsOptions = {
    // origin: [CLIENT_URL],
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Adding body parser
app.use(express.json());

// Add routes middleware
routes.addRoutes(app);

app.listen(port, () => {
    console.log(`Server started listening on port ${port}`);
});