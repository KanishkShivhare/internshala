const express = require("express");
const router = express.Router();

const {
  resume,
  addEducation,
  editEducation,
  deleteEducation,
} = require("../controllers/resumeControllers");
const { isAuthenticated } = require("../middlewares/auth");

// GET resume
router.get("/", isAuthenticated, resume);

// POST addEducation
router.post("/add-edu", isAuthenticated, addEducation);

// POST editEducation
router.post("/edit-edu/:eduid", isAuthenticated, editEducation);

// POST deleteEducation
router.post("/delete-edu/:eduid", isAuthenticated, deleteEducation);

module.exports = router;
