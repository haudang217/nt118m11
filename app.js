const express = require("express");
const app = express();
const authRouter = require("./routes/auth");
const taskRouter = require("./routes/task");
const settingRouter = require("./routes/setting");
const friendRouter = require("./routes/friendList");
const hobbyRouter = require("./routes/hobby");
const connectDB = require("./asyncFunctions/DBConnect");
const cors = require("cors");
app.use(express.json());
app.use(cors());

connectDB();

//API register, login
app.use("/auth", authRouter);

//API task
app.use("/task", taskRouter);

//API setting
app.use("/setting", settingRouter);

//API get friend list
app.use("/friendlist", friendRouter);

//API hobby
app.use("/hobby", hobbyRouter);

module.exports = app;
