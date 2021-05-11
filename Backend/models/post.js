const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  text: { type: String },
  image: { type: String },
  createDate: { type: Date, default: Date.now },
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
},{
  collection: 'posts'
});
const post = mongoose.model("Post", Schema);

module.exports = post;
