const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("../config/index");

exports.me = async (req, res, next) => {
  const { _id, firstName, lastName, email, birthdate, faculty} = req.user;

  return res.status(200).json({
    user: {
      _id: _id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      birthdate: birthdate,
      faculty: faculty
    }
  })
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("ไม่พบผู้ใช้งานในระบบ");
      error.statusCode = 404;
      throw error;
    }

    const isValid = await user.checkPassword(password);
    if (!isValid) {
      const error = new Error("รหัสผ่านไม่ถูกต้อง");
      error.statusCode = 401;
      throw error;
    }

    //สร้าง Token
    const token = await jwt.sign(
      {
        id: user._id,
      },
      config.JWT_SECRET,
      { expiresIn: "5 days" }
    );

    //decode วันหมดอายุ
    const expires_in = jwt.decode(token);

    return res.status(200).json({
      success: true,
      access_token: token,
      expires_in: expires_in.exp,
      token_type: "Bearer",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        createDate: user.createDate,
        birthdate: user.birthdate,
        faculty: user.faculty
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.show = async (req, res, next) => {
  try {
    const user = await User.find().select("-password");
    if (!user) {
      throw new Error("ไม่พบข้อมูลผู้ใช้");
    }

    res.status(200).json({
      success: true,
      message: "สำเร็จ",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      error: {
        message: "เกิดผิดพลาด " + error.message,
      },
    });
  }
};

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, birthdate, faculty } =
      req.body;

    //validiation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    //check email ซ้ำ
    const existEmail = await User.findOne({ email: email });
    if (existEmail) {
      const error = new Error("อีเมล์นี้ มีผู้ใช้แล้ว");
      error.statusCode = 400;
      throw error;
    }

    let user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = await user.encryptPassword(password);
    user.birthdate = birthdate;
    user.faculty = faculty;

    await user.save();

    return res.status(201).json({
      success: true,
      message: "ลงทะเบียนสำเร็จ",
    });
  } catch (error) {
    next(error);
  }
};
