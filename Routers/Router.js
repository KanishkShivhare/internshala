const express = require("express");
const router = express.Router();

const {
  homepage,
  currentuser,
  studentSignup,
  studentSignin,
  studentSignout,
  studentSendmail
} = require("../controllers/controllers");
const { isAuthenticated } = require("../middlewares/auth");

// just / page
router.get("/", isAuthenticated, homepage);

//POST currentuser
router.post("/student", isAuthenticated, currentuser);

//POST student/signup
router.post("/student/signup", studentSignup);

//POST student/signin
router.post("/student/signin", studentSignin);

//GET student/signout
router.get("/student/signout",isAuthenticated, studentSignout);

//GET student/send-mail
router.post("/student/send-mail", studentSendmail);

module.exports = router;
