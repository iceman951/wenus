const Notification = require("../models/notification");

exports.show = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    let notifications = await Notification.find({ user: user_id }).sort("-createDate");

    if (!notifications) {
      const error = new Error("ไม่พบข้อมูลแจ้งเตือน");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "สำเร็จ",
      notifications: notifications
    });
  } catch (error) {
    next(error);
  }
};
