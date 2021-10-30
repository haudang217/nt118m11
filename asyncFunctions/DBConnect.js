const mongoose = require("mongoose");
require("dotenv").config();

const DBConnect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@db01.99ijd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
  } catch (err) {
    console.log("Error: " + err);
  }
};

module.exports = DBConnect;
