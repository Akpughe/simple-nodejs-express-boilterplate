const { CONNECTION_STRING } = require("../config/security.config");
const mongoose = require("mongoose");

//Set up default mongoose connection
const mongoDB = CONNECTION_STRING;
mongoose.set("strictQuery", false);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
const db = mongoose.connection;
//Bind connection to success event
db.on("connected", console.log.bind(console, "MongoDB successfully connected"));

//Bind connection to error event (
db.on("error", console.error.bind(console, "MongoDB connection error:"));
