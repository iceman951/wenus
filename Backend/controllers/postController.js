const Post = require("../models/post");

exports.create = async (req, res, next) => {
  try {
    const { text } = req.body;

    let post = new Post({
      text: text,
      author: req.user._id
    });

    await post.save();

    res.status(201).json({
      message: "เพิ่มโพสต์เรียบร้อย",
    });
  } catch (error) {
    next(error);
  }
};
