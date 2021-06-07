const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

/* http://localhost:3000/comments */
router.post("/", commentController.create);

module.exports = router;
