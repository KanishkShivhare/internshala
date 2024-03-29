const express = require("express");
const router = express.Router()

const { homepage,
        studentSignup,
        studentSignin,
        studentSignout, } = require("../controllers/controllers");

// just / page
router.get("/",homepage)

//POST student/signup
router.post("/student/signup",studentSignup)

//POST student/signin
router.post("/student/signin",studentSignin)

//GET student/signout
router.get("/student/signout",studentSignout)

module.exports = router;