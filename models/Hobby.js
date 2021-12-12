const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HobbySchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  often: {
    type: Number,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("hobby", HobbySchema);
