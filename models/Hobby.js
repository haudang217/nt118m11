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
  timeLimit: {
    type: Number, //minutes
    default: 30,
  },
});
module.exports = mongoose.model("hobby", HobbySchema);
