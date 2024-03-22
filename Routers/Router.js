const express = require("express");
const router = express.Router()

const { homepage, studentSignup } = require("../controllers/controllers");

// just / page
router.get("/",homepage)

//POST student/signup
router.post("/student/signup",studentSignup)

module.exports = router;