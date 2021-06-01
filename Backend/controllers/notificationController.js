const Notification = require("../models/notification");

exports.create = async (req, res, next) => {
  try {
    const { type, post_id } = req.body;

    let notification = new Notification({
      type: type,
      post: post_id,
      user: req.user._id,
    });

    await notification.save();

    res.status(201).json({
      success: true,
      message: "เพิ่มการแจ้งเตือนเรียบร้อย",
    });
  } catch (error) {
    next(error);
  }
};

exports.show = async(req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
}