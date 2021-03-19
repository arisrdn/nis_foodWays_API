const express = require("express");

const router = express.Router();

const { getLogin } = require("../controllers/user");

router.post("/login", getLogin);

module.exports = router;
