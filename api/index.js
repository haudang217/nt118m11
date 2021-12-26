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

index.get("/", (req, res) =>
  res.send(
    <div>
      <h1> Hello, This Backend has been overwritten by team #25</h1>
      <h2> Some routes that do not requires access token to view: </h2>
      <ul>
        <li> /user/all: get all users info </li>
        <li> /: home route </li>
      </ul>
      <p>
        Other routes require access token. Please login or use our mobile app to
        check it out.{" "}
      </p>
    </div>
  )
);

index.listen(process.env.PORT || "3001", () => console.log("connected!"));

module.exports = index;
