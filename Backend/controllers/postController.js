const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

const Post = require("../models/post");

exports.create = async (req, res, next) => {
  try {
    const { text, tag, image } = req.body;

    let post = new Post({
      text: text,
      tag: tag,
      author: req.user._id,
      // image: await saveImage(image)
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

    const skip = req.params.skip ? Number(req.params.skip) : 0 ;
    const tag = req.params.tag;

    const posts = await Post.find({tag: tag}, undefined, { skip, limit: 5 })
      .sort("-createDate")
      .populate("author", "_id firstName lastName")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "_id firstName lastName",
        },
        populate: {
          path: "liked_users",
          select: "_id firstName lastName",
        },
      })
      .populate({ path: "liked_users", select: "_id firstName lastName" });

    if (!posts) {
      const error = new Error("ไม่พบข้อมูลโพสต์");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "สำเร็จ",
      data: posts,
      skip: skip
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { post_id } = req.body;
    let post = await Post.findById({ _id: post_id });

    if (!post) {
      const error = new Error("ไม่พบข้อมูลโพสต์ที่ต้องการลบ");
      error.statusCode = 404;
      throw error;
    }

    await post.delete();

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
    const { post_id, text } = req.body;

    let post = await Post.findById({ _id: post_id });

    if (!post) {
      const error = new Error("ไม่พบข้อมูลโพสต์ที่ต้องการแก้ไข");
      error.statusCode = 404;
      throw error;
    }
    post.text = text;
    await post.save();
    // await post.updateOne({text: text});

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
    const { post_id } = req.body;
    const user_id = req.user.id;

    let post = await Post.findById({ _id: post_id });

    if (!post) {
      const error = new Error("ไม่พบข้อมูลโพสต์");
      error.statusCode = 404;
      throw error;
    }

    let user = post.liked_users.find((user) => {
      return user._id == user_id;
    });

    if (!user) {
      post.liked_users.push(user_id);
    } else {
      post.liked_users.pull(user_id);
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

async function saveImage(baseImage) {
  const projectPath = path.resolve('./') ;
  //โฟลเดอร์และ path ของการอัปโหลด
  const uploadPath = `${projectPath}/public/images/`;
  const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));

  //สุ่มชื่อไฟล์ใหม่
  let filename = '';
  if (ext === 'png+xml') {
      filename = `${uuidv4.v4()}.png`;
  } else {
      filename = `${uuidv4.v4()}.${ext}`;
  }

  let image = decodeBase64Image(baseImage);

  await writeFileAsync(uploadPath+filename, image.data, 'base64');
  return filename;
}

function decodeBase64Image(base64Str) {
  var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var image = {};
  if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 string');
  }

  image.type = matches[1];
  image.data = matches[2];

  return image;
}
