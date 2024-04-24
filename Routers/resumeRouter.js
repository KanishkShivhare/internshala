const express = require("express");
const router = express.Router();

const {
  resume,
} = require("../controllers/resumeControllers");
const { isAuthenticated } = require("../middlewares/auth");

// just / page
router.get("/", isAuthenticated, resume);


module.exports = router;
