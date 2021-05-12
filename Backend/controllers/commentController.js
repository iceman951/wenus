const Comment = require("../models/comment");
const Post = require("../models/post");

exports.create = async (req, res, next) => {
  try {
    const { id, text } = req.body;
    let comment = new Comment({
        text: text,
        author: req.user._id
    });

    let post = await Post.findById({_id: id});
    await comment.save();
    await post.comments.push({_id: comment._id});
    await post.save();

    res.status(201).json({
      message: "เพิ่มคอมเมนต์เรียบร้อย",
    });
  } catch (error) {
    next(error);
  }
};
