const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth.middleware");
const Hobby = require("../models/Hobby");

//CREATE HOBBY LIST
router.post("/create", verifyToken, async (req, res) => {
  const { userId } = req;
  const { name, desc, timeLimit } = req.body;
  if (!userId || !name || !desc || !timeLimit)
    return res
      .status(401)
      .json({ success: false, message: "Missing fields !" });

  try {
    const newHobby = await new Hobby({ name, desc, timeLimit, userId });
    if (!newHobby)
      return res.status(404).json({
        sucess: false,
        message: "Something happened to backend, please try again",
      });
    await newHobby.save();
    return res
      .status(200)
      .json({ success: true, message: "Add hobby successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error: " + err });
  }
});
//GET HOBBY
router.get("/", verifyToken, async (req, res) => {
  const { userId } = req;
  if (!userId)
    return res
      .status(401)
      .json({ success: false, message: "User if not found" });

  try {
    const hobby = await Hobby.find({ userId });
    if (!hobby)
      return res.status(404).json({
        success: false,
        message: "Couldnt find ay hobby of this user",
      });

    return res
      .status(200)
      .json({ sucess: true, message: "Get hobby successfully!", hobby });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error: " + err });
  }
});

//EDIT HOBBY
router.put("/edit", verifyToken, async (req, res) => {
  const { userId } = req;
  const { hobbyId, name, desc, timeLimit } = req.body;
  if (!userId || !hobbyId || !name || !timeLimit)
    return res.status(401).json({ success: false, message: "Missing fields " });

  try {
    const hobby = await Hobby.findOneAndReplace(
      { _id: hobbyId, userId: userId },
      { name, desc, timeLimit }
    );
    if (!hobby)
      return res
        .status(404)
        .json({ success: false, message: "Hobby not found, please try again" });
    return res
      .status(200)
      .json({ success: true, message: "Update hobby succesfully!" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

//DELETE HOBBY
router.delete("/delete", verifyToken, async (req, res) => {
  const { userId } = req;
  const { hobbyId } = req.body;

  if (!userId || !hobbyId)
    return res
      .status(401)
      .json({ success: false, message: "Missing fields !" });

  try {
    const hobby = await Hobby.findOneAndDelete({ userId, _id: hobbyId });
    if (!hobby)
      return res.status(404).json({
        success: false,
        message: "Something happened to server, try again",
      });

    return res
      .status(200)
      .json({ success: true, message: "Delete hobby successfully!" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error: " + err });
  }
});

module.exports = router;
