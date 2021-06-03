const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

/* http://localhost:3000/notifications */
router.get("/", notificationController.show);

module.exports = router;
