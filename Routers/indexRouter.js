const express = require("express");
const router = express.Router();

const {
  homepage,
  currentuser,
  studentSignup,
  studentSignin,
  studentSignout,
  studentSendmail,
  studentForgetLink,
  studentresetpassword,
  studentupdate,
  studentavatar,
} = require("../controllers/indexControllers");
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
router.get("/student/signout", isAuthenticated, studentSignout);

//POST student/send-mail
router.post("/student/send-mail", studentSendmail);

//GET /student/forget-link/:studentuserid
router.get("/student/forget-link/:id", studentForgetLink);

//POST /student/resetpassword/:studentuserid
router.post(
  "/student/resetpassword/:id",
  isAuthenticated,
  studentresetpassword
);

//POST /student/update/:studentuserid
router.post(
  "/student/update/:id",
  isAuthenticated,
  studentupdate
);

//POST /student/avatar/:studentuserid
router.post(
  "/student/avatar/:id",
  isAuthenticated,
  studentavatar
);


module.exports = router;
