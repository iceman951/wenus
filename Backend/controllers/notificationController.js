const Notification = require("../models/notification");

exports.show = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    let notifications = await Notification.find({
      user: user_id,
      active: true,
    }).sort("-createDate");

    if (!notifications) {
      const error = new Error("ไม่พบข้อมูลแจ้งเตือน");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "สำเร็จ",
      notifications: notifications,
    });
  } catch (error) {
    next(error);
  }
};

exports.setIsNotifyTrue = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { user: req.user._id, isNotify: false },
      { isNotify: true }
    );

    res.status(200).json({
      success: true,
      message: "อัพเดทแจ้งเตือนสำเร็จ",
    });
  } catch (error) {
    next(error);
  }
};

exports.setIsReadTrue = async (req, res, next) => {
  try {
    const { notification_id } = req.body;
    await Notification.updateOne(
      { _id: notification_id, isRead: false },
      { isRead: true }
    );

    res.status(200).json({
      success: true,
      message: "อ่านแจ้งเตือนสำเร็จ",
    });
  } catch (error) {
    next(error);
  }
};
