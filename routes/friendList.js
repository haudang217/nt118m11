const express = require("express");
const verifyToken = require("../middlewares/auth.middleware");
const FriendList = require("../models/FriendList");
const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  const { userId } = req;
  if (!userId)
    return res
      .status(401)
      .json({ success: false, message: "Account not found" });

  try {
    const friendlist = await FriendList.find({ userId });

    if (friendlist.length === 0)
      return res
        .status(400)
        .json({ success: true, message: "User has no friends" });

    return res.status(200).json({
      success: true,
      message: "Get friend list successfully",
      friendlist,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error: " + err });
  }
});

module.exports = router;
