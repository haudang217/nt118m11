const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Hello, this is the login page" });
});

module.exports = router;
