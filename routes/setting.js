const express = require("express");
const jwt = require("jsonwebtoken");
const Setting = require("../models/Setting");
const verifyToken = require("../middlewares/auth.middleware");
const router = express.Router();

//GET SETTINGS API
router.get("/", verifyToken, async (req, res) => {
  const { userId } = req;
  if (!userId)
    return res
      .status(401)
      .json({ success: false, message: "Account not found" });

  try {
    const setting = await Setting.find({ userId });
    if (!setting)
      return res.status(404).json({
        success: false,
        message: "Not found account setting, maybe this account doesnt exist",
      });

    return res
      .status(200)
      .json({ success: true, message: "Get setting successfully", setting });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error: " + err });
  }
});

//SET SETTING API
router.post("/create", verifyToken, async (req, res) => {
  const { userId } = req;
  if (!userId)
    return res
      .status(401)
      .json({ success: false, message: "Account not found!" });

  try {
    const newSetting = new Setting({ userId });

    await newSetting.save();

    return res
      .status(200)
      .json({ success: true, message: "Create setting successfully!" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error: " + err });
  }
});

//EDIT SETTING API
router.put("/change", verifyToken, async (req, res) => {
  const { userId } = req;
  const { pomodoro, alarm, breaktime } = req.body;
  if (!userId || !pomodoro || !alarm || !breaktime)
    return res
      .status(401)
      .json({ success: false, message: "Account id not found" });

  try {
    await Setting.findOneAndUpdate({ userId }, { pomodoro, alarm, breaktime });
    return res
      .status(200)
      .json({ success: true, message: "Update setting successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error: " + err });
  }
});

module.exports = router;
