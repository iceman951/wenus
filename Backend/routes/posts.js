const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

/* http://localhost:3000/posts */
router.post("/", postController.create);

/* http://localhost:3000/posts/id/:_id */
router.get("/id/:_id", postController.showById);

/* http://localhost:3000/posts/:tag/:skip */
router.get("/tag/:tag/skip/:skip/posts_length/:length", postController.showByTag);

/* http://localhost:3000/posts/:tag/:skip */
router.get("/me/skip/:skip", postController.showMine);

/* http://localhost:3000/posts */
router.delete("/", postController.delete);

/* http://localhost:3000/posts */
router.patch("/", postController.edit);

/* http://localhost:3000/posts/like */
router.patch("/like", postController.like);

module.exports = router;