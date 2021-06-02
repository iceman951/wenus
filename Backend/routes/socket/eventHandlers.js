//const mongoose = require("mongoose");
const User = require("../../models/user");

exports.getUsersByPostId = async (post_id) => {
  try {
    //const query = { subscribedPosts: mongoose.Types.ObjectId(post_id) };
    let users = await User.find();
    return users
  } catch (error) {
  }
};
