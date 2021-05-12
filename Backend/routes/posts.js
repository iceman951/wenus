const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const passportJWT = require('../middleware/passportJWT');

router.post("/", [passportJWT.isLogin], postController.create);

module.exports = router;