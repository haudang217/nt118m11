const express = require("express");
const verifyToken = require("../middlewares/auth.middleware");
const FriendList = require("../models/FriendList");
const router = express.Router();

//GET FRIEND LIST
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

//CREATE LIST FRIEND
router.post("/create", verifyToken, async (req, res) => {
  const { userId } = req;
  if (!userId)
    return res.status(401).json({ success: false, message: "User id missing" });

  try {
    const checkExists = await FriendList.findOne({ userId });
    if (checkExists)
      return res
        .status(404)
        .json({ success: false, message: "User friend list already exists !" });

    const newFriendList = new FriendList({ userId });
    await newFriendList.save();
    return res
      .status(200)
      .json({ success: true, message: "Create new friend list successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error: " + err });
  }
});

//ADD FRIEND
router.post("/add", verifyToken, async (req, res) => {
  const { userId } = req;
  const { friendId } = req.body;

  if (!userId || !friendId)
    return res
      .status(401)
      .json({ success: false, message: "Missing fields !" });

  try {
    const userFriendList = await FriendList.findOne({ userId });
    if (!userFriendList)
      return res
        .status(400)
        .json({ success: false, message: "Something happened in the BE" });

    const oldFriendList = [...userFriendList.friendList];
    console.log(oldFriendList);

    await userFriendList.friendList.push(friendId);
    return res.status(200).json({
      success: true,
      message: "Add new friend successfully",
      userFriendList,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error: " + err });
  }
});

//UNFRIEND
router.delete("/delete", verifyToken, async (req, res) => {
  const { userId } = req;
  if (!userIf)
    return res
      .status(401)
      .json({ success: false, message: "user id not found" });

  try {
    const userFriendList = FriendList.findOneAndDelete({ userId });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error: " + err });
  }
});

module.exports = router;
