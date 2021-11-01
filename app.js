const express = require("express");
const app = express();
const authRouter = require("./routes/auth");
const connectDB = require("./asyncFunctions/DBConnect");
const cors = require("cors");
app.use(express.json());
app.use(cors());

connectDB();

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello world !");
});
module.exports = app;
