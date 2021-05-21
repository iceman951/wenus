const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

/* http://localhost:3000/posts */
router.post("/", postController.create);

/* http://localhost:3000/posts */
router.get("/:tag", postController.show);

/* http://localhost:3000/posts */
router.delete("/", postController.delete);

/* http://localhost:3000/posts */
router.patch("/", postController.edit);

/* http://localhost:3000/posts/like */
router.patch("/like", postController.like);

module.exports = router;