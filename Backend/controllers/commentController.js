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
      success: true,
      message: "เพิ่มคอมเมนต์เรียบร้อย",
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { post_id, comment_id } = req.body;
    await Comment.deleteOne({ _id: comment_id });
    await Post.updateOne({_id: post_id}, { $pullAll: {comments: [comment_id] } });

    res.status(200).json({
      success: true,
      message: "ลบสำเร็จ",
    });
  } catch (error) {
    next(error);
  }
};
