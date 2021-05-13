const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const passportJWT = require("../middleware/passportJWT");

/* http://localhost:3000/comments */
router.post("/", [passportJWT.isLogin], commentController.create);

/* http://localhost:3000/comments */
router.delete("/", [passportJWT.isLogin], commentController.delete);

/* http://localhost:3000/comments */
router.patch("/", [passportJWT.isLogin], commentController.edit);

module.exports = router;
