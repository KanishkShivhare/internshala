require("dotenv").config({ path: "./.env" });   //.env
const express = require("express");
const app = express();

//Database connection
require("./models/database").connectDatabase()

//Logger for see terminal in good way
const logger = require("morgan");
app.use(logger("tiny"));

//bodyparser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//initail routes
app.use("/", require("./Routers/Router"));

// ErrorHandler
const ErrorHandler = require("./utils/ErrorHandler");
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Requested URL Not Found ${req.url}`, 404));
});
const { genetatedErrors } = require("./middlewares/errors");
app.use(genetatedErrors); 

//Server
app.listen(
  process.env.PORT,
  console.log(`this server is running on ${process.env.PORT}`)
);
