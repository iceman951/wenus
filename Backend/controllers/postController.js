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
    next(error);  
  }
}

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.body;
    await Post.deleteOne({_id: id })

    res.status(200).json({
      message: 'ลบสำเร็จ',
  });

  } catch (error) {
    next(error);
  }
};

exports.edit = async (req, res, next) => {
  try {
    const { id, text } = req.body;
    const post = await Post.updateOne({_id: id},{
      text: text,
    });

    if (post.nModified === 0) {
      throw new Error('ไม่สามารถอัปเดตข้อมูลได้');
    } else {
      res.status(200).json({
        message: 'แก้ไขข้อมูลเรียบร้อย'
      });
    }
  } catch (error) {
    next(error);
  }
};