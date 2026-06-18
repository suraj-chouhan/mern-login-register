const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");
const { dashboardInfo } = require("../controllers/dashboardController");

router.post("/register", registerUser);
router.post("/login",loginUser);

router.get("/dashboard",authMiddleware,dashboardInfo);

module.exports = router;