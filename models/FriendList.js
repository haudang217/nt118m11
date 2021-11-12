const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  friendList: [
    {
      type: String,
      unique: true,
    },
  ],
});

module.exports = mongoose.model("friendlist", FriendSchema);
