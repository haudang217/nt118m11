const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  friendList: {
    type: Array,
    default: ["1234"], //mang userID cua ban be
  },
});

module.exports = mongoose.model("friendlist", FriendSchema);
