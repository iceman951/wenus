const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    active: { type: Boolean, default: true},
    likeAmount: {type: Number, defalut: 0},
    createDate: { type: Date, default: Date.now },
  },
  {
    collection: "notifications",
  }
);
const notification = mongoose.model("Notification", schema);

module.exports = notification;
