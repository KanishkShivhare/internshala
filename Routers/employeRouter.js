const express = require("express");
const router = express.Router();

const {
  homepage,
  currentemploye,
  employeSignup,
  employeSignin,
  employeSignout,
  employeSendmail,
  employeForgetLink,
  employeresetpassword,
  employeupdate,
  employelogo,
  createinternship,
} = require("../controllers/employeControllers");
const { isAuthenticated } = require("../middlewares/auth");

// just / page
router.get("/", isAuthenticated, homepage);

//POST currentemploye
router.post("/currentemploye", isAuthenticated, currentemploye);

//POST employe/signup
router.post("/signup", employeSignup);

//POST employe/signin
router.post("/signin", employeSignin);

//GET employe/signout
router.get("/signout", isAuthenticated, employeSignout);

//POST employe/send-mail
router.post("/send-mail", employeSendmail);

//GET /employe/forget-link/:employeuserid
router.get("/forget-link/:id", employeForgetLink);

//POST /employe/resetpassword/:employeuserid
router.post("/resetpassword/:id", isAuthenticated, employeresetpassword);

//POST /employe/update/:employeuserid
router.post("/update/:id", isAuthenticated, employeupdate);

//POST /employe/logo/:employeuserid
router.post("/logo/:id", isAuthenticated, employelogo);

// .....................internship......................

//POST /employe/internship/:employeuserid
router.post("/internship/create", isAuthenticated, createinternship);

module.exports = router;
