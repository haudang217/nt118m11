const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
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
});

module.exports = mongoose.model("task", TaskSchema);
