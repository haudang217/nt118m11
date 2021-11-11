const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const User = require("../models/User");
const Setting = require("../models/Setting");
const jwt = require("jsonwebtoken");

require("dotenv").config();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  //neu ko co thi tra ve ko co data
  if (!username || !password)
    return res.status(400).json({ success: false, message: "Missing field" });

  //kiem trong db
  try {
    const user = await User.findOne({ username });

    //neu khong kiem ra
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Account not found" });

    //neu kiem ra
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    //gui ve cho user
    return res
      .status(200)
      .json({ success: true, message: "Login successfully", accessToken });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server err: " + err });
  }
});

//dang ky phai goi luon API de tao list friend va setting

router.post("/register", async (req, res) => {
  const { username, password, fullname } = req.body;

  if (!username || !password || !fullname) {
    return res
      .status(400)
      .json({ success: false, message: "Missing username / password !" });
  }

  console.log("New user: " + username);

  //tim trong db co cai ten nao giong z chua
  try {
    const user = await User.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Username already exist" });

    //neu khong tim thay, tao moi roi them user vao DB
    //a ma khoan, hash password da
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hashedPassword, fullname });

    //them vao DB ne
    await newUser.save();

    //gui ve cho user 1 cai accesstoken
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    //tao luon setting mac dinh
    const defaultSetting = new Setting({ userId: newUser._id });

    return res.status(200).json({
      success: true,
      message: "Create account successfully",
      accessToken,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error: " + err });
  }
});

router.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Hello, this is the login page" });
});

module.exports = router;
