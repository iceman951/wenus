const mongoose = require("mongoose");
const Comment = require("./comment");

const schema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    image: { type: String },
    createDate: { type: Date, default: Date.now },
    tag: { type: String, default: "ทั่วไป" },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [Comment.schema],
    liked_users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    active: {type: Boolean, default: true}
  },

  {
    collection: "posts",
  }
);
const post = mongoose.model("Post", schema);

module.exports = post;
