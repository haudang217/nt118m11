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
    default: new Date().toISOString(),
  },
  endDay: {
    type: String,
    default: new Date().toISOString(),
  },
  taskPerDay: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("task", TaskSchema);
