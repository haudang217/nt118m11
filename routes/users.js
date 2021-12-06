var express = require("express");
const verifyToken = require("../middlewares/auth.middleware");
const User = require("../models/User");
const router = express.Router();

/* GET users listing. */
router.get("/all", async (req, res) => {
  try {
    const userList = await User.find(
      {},
      { username: 1, fullname: 1, pomodoroDone: 1 }
    );
    if (!userList)
      return res
        .status(404)
        .json({ success: false, message: "Please try again" });

    return res.status(200).json({
      success: true,
      message: "Get user list successfully",
      userList,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error: " + err });
  }
});

router.get("/info", verifyToken, async (req, res) => {
  const { userId } = req;
  if (!userId)
    return res
      .status(401)
      .json({ success: false, message: "No user id found" });

  try {
    const userInfo = await User.findOne(
      { _id: userId },
      { username: 1, fullname: 1, email: 1 }
    );

    if (!userInfo)
      return res
        .status(404)
        .json({ success: false, message: "User info not found" });

    return res
      .status(200)
      .json({ success: true, message: "Get user info successfully", userInfo });
  } catch (err) {
    console.log("Get user info invalid: " + err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server err: " + err });
  }
});

module.exports = router;
