const mongoose = require("mongoose");
const User = require("../../models/user");
const Notification = require("../../models/notification");
const Post = require("../../models/post");

exports.createCommentNotification = async (type, post_id, user_id) => {
  try {
    const query = { subscribedPosts: mongoose.Types.ObjectId(post_id) };
    let users = await User.find(query);

    let notification;
    for (const user of users) {
      if (JSON.stringify(user._id) != JSON.stringify(user_id)) {
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

exports.createLikeNotification = async (type, post_id) => {
  try {
    let post = await Post.findById({ _id: post_id });
    let notification = await Notification.findOne({
      user: post.author,
      type: type,
      post: post_id,
    });
    if (!notification) {
      notification = new Notification({
        type: type,
        post: post_id,
        user: post.author,
        likeAmount: post.liked_users.length,
      });
      await notification.save();
    } else {
      notification.likeAmount = post.liked_users.length;
      await notification.save();
    }
  } catch (error) {
    return error;
  }
};
