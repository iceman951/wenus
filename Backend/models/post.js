const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  text: { type: String },
  image: { type: String },
  createDate: { type: Date, default: Date.now },
  tag: { type: String},
  author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  liked_users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ]
},{
  collection: 'posts'
});
const post = mongoose.model("Post", Schema);

module.exports = post;
