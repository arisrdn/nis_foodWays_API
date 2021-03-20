const express = require("express");

const router = express.Router();
const { authenticated } = require("../middleware/auth");
const { textSanitaze } = require("../middleware/textSanitaze");

const { register, login } = require("../controllers/auth");
const { getUsers, getDetailUser, updateUser } = require("../controllers/user");

// Loginregister
router.post("/login", textSanitaze, login);
router.post("/register", register);

// Users
router.get("/users", getUsers);
router.get("/user", authenticated, getDetailUser);
router.patch("/user/update", authenticated, updateUser);

module.exports = router;
