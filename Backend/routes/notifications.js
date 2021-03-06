const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

/* http://localhost:3000/notifications */
router.get("/", notificationController.show);

/* http://localhost:3000/notifications */
router.patch("/", notificationController.setIsNotifyTrue);

/* http://localhost:3000/notifications/update */
router.patch("/read", notificationController.setIsReadTrue);

module.exports = router;
