const Post = require("../models/post");
const Comment = require("../models/comment");

exports.create = async (req, res, next) => {
  try {
    const { text, tag } = req.body;

    let post = new Post({
      text: text,
      tag: tag,
      author: req.user._id,
    });

    await post.save();

    res.status(201).json({
      success: true,
      message: "เพิ่มโพสต์เรียบร้อย",
    });
  } catch (error) {
    next(error);
  }
};

exports.show = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("author", "_id firstName lastName")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "_id firstName lastName",
        },
      });
    if (!posts) {
      throw new Error("ไม่พบข้อมูลโพสต์");
    }

    res.status(200).json({
      success: true,
      message: "สำเร็จ",
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.body;
    let post = await Post.findById({ _id: id});
    await Comment.deleteMany({ _id: { $in: post.comments}});
    await Post.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
      message: "ลบสำเร็จ",
    });
  } catch (error) {
    next(error);
  }
};

exports.edit = async (req, res, next) => {
  try {
    const { id, text } = req.body;
    const post = await Post.updateOne(
      { _id: id },
      {
        text: text,
      }
    );

    if (post.nModified === 0) {
      throw new Error("ไม่สามารถอัปเดตข้อมูลได้");
    } else {
      res.status(200).json({
        success: true,
        message: "แก้ไขข้อมูลเรียบร้อย",
      });
    }
  } catch (error) {
    next(error);
  }
};
