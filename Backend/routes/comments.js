const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

/* http://localhost:3000/comments */
router.post("/", commentController.create);

/* http://localhost:3000/comments */
router.delete("/", commentController.delete);

/* http://localhost:3000/comments */
router.patch("/", commentController.edit);

/* http://localhost:3000/comments */
router.get("/", commentController.show);

module.exports = router;
