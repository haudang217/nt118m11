const express = require("express");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const Task = require("../models/Task");
const router = express.Router();

require("dotenv").config();

router.post("/add", async (req, res) => {
  const { taskname, deadline, totalTime, importantRate } = req.body;

  //thieu truong thi tra ve
  if (!taskname || !deadline || !totalTime || !importantRate)
    return res
      .status(401)
      .json({ success: false, message: "Unable to save, please try again" });

  //them no vao DB
  const newTask = new Task({ taskname, deadline, totalTime, importantRate });

  try {
    await newTask.save();
    return res
      .status(200)
      .json({ success: true, message: "Create task successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error: " + err });
  }
});

module.exports = router;
