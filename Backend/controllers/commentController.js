const Comment = require("../models/comment");
const Post = require("../models/post");

exports.create = async (req, res, next) => {
  try {
    const { post_id, text } = req.body;
    let post = await Post.findById({ _id: post_id });

    if (!post) {
      const error = new Error("ไม่พบข้อมูลโพสต์ที่ต้องการเพิ่มคอมเมนต์");
      error.statusCode = 404;
      throw error;
    }

    let comment = new Comment({
      text: text,
      author: req.user._id,
    });

    await post.comments.push(comment);
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
    const { comment_id } = req.body;

    let post = await Post.findOne({comments: {$elemMatch: {_id: comment_id}}});

    if (!post) {
      const error = new Error("ไม่พบข้อมูลคอมเมนต์ที่ต้องการลบ");
      error.statusCode = 404;
      throw error;
    }

    await post.comments.pull({_id: comment_id});
    await post.save();

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
    const { comment_id, text } = req.body;
    let post = await Post.findOne({comments: {$elemMatch: {_id: comment_id}}});

    if (!post) {
      const error = new Error("ไม่พบข้อมูลคอมเมนต์ที่ต้องการแก้ไข");
      error.statusCode = 404;
      throw error;
    }

    console.log(post);
    // await post.save();

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

exports.show = async (req, res, next) => {
  try {
    const { id } = req.body;
    const posts = await Post.find({comments: {$elemMatch: {_id: id}}});

    res.status(200).json({
      success: true,
      message: "สำเร็จ",
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};