const express = require("express");
const index = express();
const authRouter = require("../routes/auth");
const taskRouter = require("../routes/task");
const settingRouter = require("../routes/setting");
const friendRouter = require("../routes/friendList");
const hobbyRouter = require("../routes/hobby");
const userRouter = require("../routes/users");
const connectDB = require("../asyncFunctions/DBConnect");
const cors = require("cors");
var bodyParser = require("body-parser");

index.use(bodyParser.json({ limit: "50mb" }));
index.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
index.use(express.json());
index.use(cors());

connectDB();

//API register, login
index.use("/auth", authRouter);

//API task
index.use("/task", taskRouter);

//API setting
index.use("/setting", settingRouter);

//API get friend list
index.use("/friendlist", friendRouter);

//API hobby
index.use("/hobby", hobbyRouter);

//API get all users
index.use("/user", userRouter);

index.get("/", (req, res) => res.send("Hello world"));

index.listen("3001", () => console.log("connected!"));

module.exports = index;
