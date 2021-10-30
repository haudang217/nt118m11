const express = require("express");
const app = express();
const authRouter = require("./routes/auth");

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello world !");
});
module.exports = app;
