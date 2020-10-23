const { validationResult, Result } = require('express-validator/check');
const classroom = require('../models/classroom');
const teacher = require('../models/teacher');
const { countDocuments, findByIdAndRemove } = require('../models/teacher');

const Teacher = require('../models/teacher');
const User = require('../models/user');

exports.getTeachers = (req, res, next) => {
    Teacher
        .find()
        .then(teachers => {
            res.status(200).json({ message: 'Fetched teachers successfully.', teachers: teachers });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.createTeacher = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed, entered data is incorrect.',
            errors: errors.array()
        })
    }
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const classroomId = req.body.classroomId;
    let creator;
    const teacher = new Teacher({
        firstName: firstName,
        lastName: lastName,
        classroomId: classroomId,
        creator: req.userId
    });
    teacher
        .save()
        .then(result => {
            return User.findById(req.userId);
        })
        .then(user => {
            creator = user;
            user.teachers = [teacher._id];
            return user.save();
        })
        .then(result => {
            res.status(201).json({ //201 status code means a resource was created successfully
                message: 'Teacher created successfully!',
                teacher: teacher,
                creator: {_id: creator._id, name: creator.name}
            });
        })
        .catch(err => console.log(err))
    ;
    
}

exports.getTeacher = (req, res, next) => {
    const teacherId = req.params.teacherId;
    Teacher
        .findById(teacherId)
        .then(teacher => {
            if (!teacher) {
                const error = new Error('Could not find teacher.');
                error.satusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'Teacher fetched', teacher: teacher });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);  
        })
    ;
}

exports.updateteacher = (req, res, next) => {
    const teacherId = req.params.teacherId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const classroomId = req.body.classroomId;
    Teacher
        .findById(teacherId)
        .then(teacher => {
            if(!teacher) {
                const error = new Error('Could not find teacher.');
                error.statusCode = 404;
                throw error;               
            }
            if (teacher.creator.toString() !== req.userId) {
                const error = new Error('Not authorized!');
                error.statusCode = 403;
                throw error;
            }
            teacher.firstName = firstName;
            teacher.lastName = lastName;
            teacher.classroomId = classroomId;
            return teacher.save();
        })
        .then(result => {
            res.status(200).json({ message: 'Teacher updated!', teacher: result });
        })
        .catch(err => {
            if (!err.satusCode) {
                err.statusCode = 500;
            }
            next(err);           
        })
    ;
}

exports.deleteTeacher = (req, res, next) => {
    const teacherId = req.params.teacherId;
    Teacher
        .findById(teacherId)
        .then(teacher => {
            if(!teacher) {
                const error = new Error('Could not find teacher.');
                error.statusCode = 404;
                throw error;               
            }
            if (teacher.creator.toString() !== req.userId) {
                const error = new Error('Not authorized!');
                error.statusCode = 403;
                throw error;
            }
                //check logged in user
            return Teacher.findByIdAndRemove(teacherId);
        })
        .then(result => {
            return User.findById(req.userId);
        })
        .then(user => {
            user.teachers = null;
            return user.save();
        })
        .then(result => {
            res.status(200).json({ message: 'Deleted teacher.', user: result })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);           
        })
    ;

}