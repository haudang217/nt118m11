const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SettingSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  pomodoro: {
    type: Number, //minutes
    required: true,
    default: 25,
  },
  breaktime: {
    type: Number,
    required: true,
    default: 05,
  },
});

module.exports = mongoose.model("setting", SettingSchema);
