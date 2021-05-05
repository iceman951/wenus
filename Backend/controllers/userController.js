const User = require('../models/user');
const { validationResult } = require('express-validator');

exports.show = async (req, res, next) => {
    try {
        const user = await User.find().select('-password');
        if (!user) {
            throw new Error('ไม่พบข้อมูลผู้ใช่');
        }

        res.status(200).json({
            message: 'สำเร็จ',
            data: user
        });

    } catch (error) {
        res.status(400).json({
            error: {
                message: 'เกิดผิดพลาด ' + error.message
            } 
        });
    }
}

exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, birthDate, faculty } = req.body;

        //validiation
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const error = new Error('ข้อมูลไม่ถูกต้อง');
            error.statusCode = 422;
            error.validation = errors.array();
            throw error;
        }

        //check email ซ้ำ
        const existEmail = await User.findOne({email: email});
        if (existEmail) {
            const error = new Error('อีเมล์นี้ มีผู้ใช้แล้ว');
            error.statusCode = 400;
            throw error;
        }

        let user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = await user.encryptPassword(password);
        user.birthDate = birthDate;
        user.faculty = faculty;

        await user.save();

        return res.status(201).json({
            message: 'ลงทะเบียนสำเร็จ'
        });
    } catch (error) {
        next(error);
    }
};