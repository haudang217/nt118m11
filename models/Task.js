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
    type: Date,
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
  status: {
    type: Boolean, //true la xong, false la chua xong
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("task", TaskSchema);
