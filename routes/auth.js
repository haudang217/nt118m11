const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
require("dotenv").config();

router.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Hello, this is the login page" });
});

router.get("/login", (req, res) => {});

router.get("/register", (req, res) => {});

module.exports = router;
