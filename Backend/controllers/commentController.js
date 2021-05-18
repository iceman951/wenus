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

    let post = await Post.findOne({
      comments: { $elemMatch: { _id: comment_id } },
    });

    if (!post) {
      const error = new Error("ไม่พบข้อมูลคอมเมนต์ที่ต้องการลบ");
      error.statusCode = 404;
      throw error;
    }

    await post.comments.pull({ _id: comment_id });
    await post.save();

    // post.comments = post.comments.filter((comment) => comment._id != comment_id)
    // post.save()

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
    const query = { comments: { $elemMatch: { _id: comment_id } } };
    let post = await Post.findOneAndUpdate(query, {
      $set: { "comments.$.text": text },
    });

    if (!post) {
      const error = new Error("ไม่พบข้อมูลคอมเมนต์ที่ต้องการแก้ไข");
      error.statusCode = 404;
      throw error;
    }

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

exports.like = async (req, res, next) => {
  try {
    const { comment_id } = req.body;
    const user_id = req.user.id;
    const query = { comments: { $elemMatch: { _id: comment_id } } };

    let post = await Post.findOne(query);

    if (!post) {
      const error = new Error("ไม่พบข้อมูลโพสต์");
      error.statusCode = 404;
      throw error;
    }

    let comment = post.comments.find((comment) => {
      return comment._id == comment_id;
    });

    if (!comment) {
      const error = new Error("ไม่พบข้อมูลคอมเมนต์");
      error.statusCode = 404;
      throw error;
    }
    let index = post.comments.findIndex((comment) => comment._id == comment_id);

    let user = comment.liked_users.find((user) => {
      return user._id == user_id;
    });

    if (!user) {
      post.comments[index].liked_users.push(user_id);
    } else {
      post.comments[index].liked_users.pull(user_id);
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: "กด like สำเร็จ",
    });
  } catch (error) {
    next(error);
  }
};
