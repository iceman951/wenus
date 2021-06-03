const mongoose = require("mongoose");
const User = require("../../models/user");
const Post = require("../../models/post");
const Notification = require("../../models/notification");

exports.createNotification = async (type, post_id) => {
  try {
    const query = { subscribedPosts: mongoose.Types.ObjectId(post_id) };
    let users = await User.find(query);
    let post = await Post.findOne({ _id: post_id });
    let notification;
    for (const user of users) {
      if (JSON.stringify(user._id) != JSON.stringify(post.author)) {
        notification = new Notification({
          type: type,
          post: post_id,
          user: user._id,
        });
        await notification.save();
      }
    }
  } catch (error) {
    return error;
  }
};
