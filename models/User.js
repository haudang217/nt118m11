const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pomodoroDone: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("user", UserSchema);
