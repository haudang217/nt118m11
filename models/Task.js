const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  taskname: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  totalTime: {
    type: Number,
    required: true,
  },
  importantRate: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: "hello this is a testing message",
    required: true,
  },

  //BE tu tinh toan
  pomodoroPeriod: {
    type: Number,
    default: 0,
  },
  done: {
    type: Number, //so task da xong
    default: 0,
  },
  startDay: {
    type: String,
  },
  endDay: {
    type: String,
  },
});

module.exports = mongoose.model("task", TaskSchema);
