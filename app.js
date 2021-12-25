const express = require("express");
const app = express();
const authRouter = require("./routes/auth");
const taskRouter = require("./routes/task");
const settingRouter = require("./routes/setting");
const friendRouter = require("./routes/friendList");
const hobbyRouter = require("./routes/hobby");
const userRouter = require("./routes/users");
const connectDB = require("./asyncFunctions/DBConnect");
const cors = require("cors");
var bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
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

//API get all users
app.use("/user", userRouter);

app.get("/", (req, res) =>
  res.send(
    "<div><h1> Hello, This Backend has been overwritten by team #25</h1> <h2> Some routes that do not require access token to view: </h2> <ul><li> /user/all: get all users info </li> <li> /: home route </li> </ul><p>Other routes require access token. Please login or use our mobile app to check it out.</p> </div>"
  )
);

app.listen("3001", () => console.log("connected!"));

module.exports = app;
