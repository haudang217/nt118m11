const express = require("express");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const Task = require("../models/Task");
const verifyToken = require("../middlewares/auth.middleware");
const router = express.Router();
const newTimingAlgo = require("../asyncFunctions/newTimingAlgo");

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
    let tasks = await Task.find({ userId });

    if (!tasks)
      return res.status(404).json({ success: false, message: "No task found" });

    let a = false;
    let counter = 1;
    while (a == false) {
      counter += 1;
      a = newTimingAlgo(counter, tasks);
    }

    return res
      .status(200)
      .json({ success: true, message: "Get tasks successfully", tasks: a });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error: " + err });
  }
});

//ADD NEW TASK API
router.post("/add", verifyToken, async (req, res) => {
  const {
    taskname,
    deadline,
    totalTime,
    importantRate,
    description,
    pomodoroPeriod,
  } = req.body;
  console.log(req.body);

  //thieu truong thi tra ve
  if (!taskname || !deadline || !totalTime || !importantRate)
    return res.status(401).json({ success: false, message: "Missing field!" });

  //them no vao DB
  const newTask = new Task({
    taskname,
    deadline,
    totalTime,
    importantRate,
    description,
    pomodoroPeriod,
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
      .json({ success: false, message: "Internal server error: " + err });
  }
});

//EDIT TASK
router.put("/edit", async (req, res) => {
  const { _id, taskname, deadline, importantRate, totalTime, description } =
    req.body;
  if (
    !_id ||
    !taskname ||
    !deadline ||
    !importantRate ||
    !totalTime ||
    !description
  )
    return res.status(401).json({ success: false, message: "Missing fields" });

  try {
    await Task.findOneAndUpdate(
      { _id: _id },
      { taskname, deadline, importantRate, totalTime, description }
    );

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

//UPDATE POMODORO DONE
router.put("/update/pomodoro", async (req, res) => {
  const { taskId } = req.body;

  if (!taskId)
    return res.status(401).json({ success: false, message: "Bad request" });

  try {
    let donePomodoro = await Task.findOne(
      { _id: taskId },
      { done: 1, pomodoroPeriod: 1 }
    );

    let newPmdr = (await donePomodoro.done) + 1;
    if (newPmdr <= (await donePomodoro.pomodoroPeriod)) {
      const task = await Task.findOneAndUpdate(
        { _id: taskId },
        { done: newPmdr }
      );
      if (task)
        return res
          .status(200)
          .json({
            success: true,
            message: "update pomodoro successfully",
            task,
          });
    }
    return res
      .status(403)
      .json({ success: false, message: "task done already" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + err,
    });
  }
});

module.exports = router;
