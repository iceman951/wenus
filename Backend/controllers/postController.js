const Post = require("../models/post");

exports.create = async (req, res, next) => {
  try {
    const { text, tag } = req.body;

    let post = new Post({
      text: text,
      tag: tag,
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

exports.show = async (req, res, next) => {
  try {
      const post = await Post.find().populate('author', '_id firstName lastName').sort('-_id');;
      if (!post) {
          throw new Error('ไม่พบข้อมูลโพสต์');
      }

      res.status(200).json({
          message: 'สำเร็จ',
          data: post
      });

  } catch (error) {
      res.status(400).json({
          error: {
              message: 'เกิดผิดพลาด ' + error.message
          } 
      });
  }
}

exports.delete = async (req, res, next) => {
  try {

  } catch (error) {
    next(error);
  }
};
