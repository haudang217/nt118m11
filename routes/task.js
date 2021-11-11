const express = require("express");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const Task = require("../models/Task");
const verifyToken = require("../middlewares/auth.middleware");
const router = express.Router();

require("dotenv").config();

//GET ALL TASKS API
router.get("/", verifyToken, async (req, res) => {
  const { userId } = req;
  if (!userId)
    return res.status(401).json({
      success: false,
      message: "User account not fount",
    });

  try {
    const tasks = await Task.find({ userId: req.userId });
    if (!tasks)
      return res.status(404).json({ success: false, message: "No task found" });
    return res
      .status(200)
      .json({ success: true, message: "Get tasks successfully", tasks });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error: " + err });
  }
});

//ADD NEW TASK API
router.post("/add", verifyToken, async (req, res) => {
  const { taskname, deadline, totalTime, importantRate } = req.body;

  //thieu truong thi tra ve
  if (!taskname || !deadline || !totalTime || !importantRate)
    return res.status(401).json({ success: false, message: "Missing field!" });

  //them no vao DB
  const newTask = new Task({
    taskname,
    deadline,
    totalTime,
    importantRate,
    userId: req.userId,
  });

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

//DELETE TASK
router.delete("/delete", verifyToken, async (req, res) => {
  const { userId } = req;
  const { taskId } = req.body;

  if (!userId || !taskId)
    return res
      .status(401)
      .json({ success: false, message: "Account not found" });

  try {
    const wastedTask = await Task.findOneAndDelete({ userId, _id: taskId });
    if (!wastedTask)
      return res.status(404).json({
        success: false,
        message: "Cant find task in DB, please try again ",
      });
    return res
      .status(200)
      .json({ success: true, message: "Delete task successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ succesS: false, message: "Internal server error: " + err });
  }
});

//EDIT TASK
router.put("/edit", verifyToken, async (req, res) => {
  const { userId } = req;
  const { taskId, taskname } = req.body;
  if (!userId || !taskId || !taskname)
    return res
      .status(401)
      .json({ success: false, message: "User id not found" });

  try {
    const task = Task.findOneAndUpdate({ _id: taskId }, { taskname });
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found!" });

    return res
      .status(200)
      .json({ success: true, message: "Update task successfully!" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + err,
    });
  }
});

module.exports = router;
