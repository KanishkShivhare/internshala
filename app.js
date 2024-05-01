require("dotenv").config({ path: "./.env" }); //.env
const express = require("express");
const app = express();

//Database connection
require("./models/database").connectDatabase();

//Logger for see terminal in good way
const logger = require("morgan");
app.use(logger("tiny"));

//bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// //session and cookies
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPESS_SESSION_SECRET,
  })
);
app.use(cookieParser());

//express file-upload
const fileupload = require("express-fileupload");
app.use(fileupload());

//routes
app.use("/user", require("./Routers/indexRouter"));
app.use("/resume", require("./Routers/resumeRouter"));
app.use("/employe", require("./Routers/employeRouter"));

// ErrorHandler
const ErrorHandler = require("./utils/ErrorHandler");
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Requested URL Not Found ${req.url}`, 404));
});
const { genetatedErrors } = require("./middlewares/errors");
// const cookieParser = require("cookie-parser");
app.use(genetatedErrors);

//Server
app.listen(
  process.env.PORT,
  console.log(`this server is running on ${process.env.PORT}`)
);
