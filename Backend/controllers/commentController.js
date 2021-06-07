const Comment = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");

exports.create = async (req, res, next) => {
  try {
    const { post_id, text } = req.body;
    let post = await Post.findById({ _id: post_id });
    let user = await User.findById({ _id: req.user._id });

    if (!post) {
      const error = new Error("ไม่พบข้อมูลโพสต์ที่ต้องการเพิ่มคอมเมนต์");
      error.statusCode = 404;
      throw error;
    }

    let comment = new Comment({
      text: text,
      author: req.user._id,
    });

    post.comments.push(comment);
    await post.save();

    //user subscribe post
    if (!user.subscribedPosts.includes(post_id)) {
      user.subscribedPosts.push(post_id);
      await user.save();
    }

    res.status(201).json({
      success: true,
      message: "เพิ่มคอมเมนต์เรียบร้อย",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};