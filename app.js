const express = require("express");
const app = express();
const authRouter = require("./routes/auth");
const taskRouter = require("./routes/task");
const connectDB = require("./asyncFunctions/DBConnect");
const cors = require("cors");
app.use(express.json());
app.use(cors());

connectDB();

//API register, login
app.use("/auth", authRouter);

//API task
app.use("/task", taskRouter);

//default
app.get("/", (req, res) => {
  res.send("Hello world !");
});

module.exports = app;
