const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const passportJWT = require('../middleware/passportJWT');

/* http://localhost:3000/posts */
router.post("/", [passportJWT.isLogin], postController.create);

/* http://localhost:3000/posts */
router.get("/", [passportJWT.isLogin], postController.show);

/* http://localhost:3000/posts */
router.delete("/", [passportJWT.isLogin], postController.delete);

module.exports = router;