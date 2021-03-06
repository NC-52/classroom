const { validationResult } = require('express-validator/check');

const Student = require('../models/student');
const User = require('../models/user');
const { post } = require('../routes/auth');

exports.getStudents = (req, res, next) => {
    Student
        .find()
        .then(students => {
            res.status(200).json({ message: 'Fetched students successfully.', students: students });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.createStudent = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed, entered data is incorrect.',
            errors: errors.array()
        })
    }
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const grade = req.body.grade;
    const classId = req.body.classId;
    let creator;
    const student = new Student({
        firstName: firstName,
        lastName: lastName,
        grade: grade,
        classId: classId,
        creator: req.userId
    });
    student
        .save()
        .then(() => {
            return User.findById(req.userId);
        })
        .then(user => {
            creator = user;
            user.students = [student._id];
            return user.save();
        })
        .then(() => {
            res.status(201).json({ //201 status code means a resource was created successfully
                message: 'Student created successfully!',
                student: student,
                creator: {_id: creator._id, name: creator.name}
            });
        })
        .catch(err => console.log(err))
    ;
    
}

exports.getStudent = (req, res, next) => {
    const studentId = req.params.studentId;
    Student
        .findById(studentId)
        .then(student => {
            if (!student) {
                const error = new Error('Could not find student.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'Student fetched', student: student });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);  
        })
    ;
}

exports.updateStudent = (req, res, next) => {
    const studentId = req.params.studentId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const grade = req.body.grade;
    const classId = req.body.classId;
    Student
        .findById(studentId)
        .then(student => {
            if(!student) {
                const error = new Error('Could not find student.');
                error.statusCode = 404;
                throw error;               
            }
            if (student.creator.toString() !== req.userId) {
                const error = new Error('Not authorized!');
                error.statusCode = 403;
                throw error;
            }
            student.firstName = firstName;
            student.lastName = lastName;
            student.grade = grade;
            student.classId = classId;
            return student.save();
        })
        .then(result => {
            res.status(200).json({ message: 'Student updated!', student: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);           
        })
    ;
}

exports.deleteStudent = (req, res, next) => {
    const studentId = req.params.studentId;
    Student
        .findById(studentId)
        .then(student => {
            if(!student) {
                const error = new Error('Could not find student.');
                error.statusCode = 404;
                throw error;               
            }
            if (student.creator.toString() !== req.userId) {
                const error = new Error('Not authorized!');
                error.statusCode = 403;
                throw error;
            }
                //check logged in user
            return Student.findByIdAndRemove(studentId);
        })
        .then(() => {
            return User.findById(req.userId);
        })
        .then(user => {
            user.students = null;
            return user.save();
        })
        .then(result => {
            res.status(200).json({ message: 'Deleted student.', user: result })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);           
        })
    ;

}