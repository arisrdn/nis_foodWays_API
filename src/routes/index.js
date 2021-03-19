const express = require("express");

const router = express.Router();
// const { textSanitaze } = require("../middleware/textSanitaze");

const { register, login } = require("../controllers/auth");

// Loginregister
router.post("/login", login);
router.post("/register", register);

module.exports = router;
