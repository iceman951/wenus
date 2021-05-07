const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', userController.show);

/* http://localhost:3000/users/login */
router.post('/login', userController.login);

/* http://localhost:3000/users/register */
router.post('/register', [
  body('firstName').not().isEmpty().withMessage('กรุณากรอกชื่อ'),
  body('lastName').not().isEmpty().withMessage('กรุณากรอกนามสกุล'),
  body('email').not().isEmpty().withMessage('กรุณากรอกอีเมล์').isEmail().withMessage('รูปแบบอีเมล์ไม่ถูกต้อง'),
  body('password').not().isEmpty().withMessage('กรุณากรอกรหัสผ่านด้วย').isLength({min: 3}).withMessage('รหัสผ่านต้อง 3 ตัวอักษรขึ้นไป'),
  body('birthdate').not().isEmpty().withMessage('กรุณากรอกวันเกิด').isDate().withMessage('รูปแบบวันที่ไม่ถูกต้อง'),
  body('faculty').not().isEmpty().withMessage('กรุณากรอกคณะ')

] ,userController.register);

module.exports = router;
