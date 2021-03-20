const express = require("express");

const router = express.Router();
const { textSanitaze } = require("../middleware/textSanitaze");

const { register, login } = require("../controllers/auth");
const {
	getUsers,
	getDetailUser,
	addUser,
	updateUser,
	deleteUser,
} = require("../controllers/user");

// Loginregister
router.post("/login", textSanitaze, login);
router.post("/register", register);

// Users
router.get("/users", getUsers);
router.get("/user", getUsers);

module.exports = router;
