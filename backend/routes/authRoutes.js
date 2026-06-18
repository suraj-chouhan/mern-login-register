const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login",loginUser);

router.get("/dashboard",authMiddleware,
    (req,res)=>{
        res.json({
            message:"Welcome to Dashboard",
            user:res.user
        });
    }
);

module.exports = router;