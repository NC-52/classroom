const { validationResult, Result } = require('express-validator/check');
const { countDocuments, findByIdAndRemove } = require('../models/classroom');

const Classroom = require('../models/classroom');
const classroom = require('../models/classroom');
const User = require('../models/user');

exports.getClassrooms = (req, res, next) => {
    Classroom
        .find()
        .then(classroom => {
            res.status(200).json({ message: 'Fetched classroom successfully.', classroom: classroom });
        })
        .catch(err => {
            if (!err.satusCode) {
                err.satusCode = 500;
            }
            next(err);
        })
}

exports.createClassroom = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed, entered data is incorrect.',
            errors: errors.array()
        })
    }
    const clName = req.body.clName;
    const numOfStudents = req.body.numOfStudents;
    const size = req.body.size;
    let creator;
    const classroom = new Classroom({
        clName: clName,
        numberOfStudents: numOfStudents,
        size: size,
        creator: req.userId
    });
    classroom
        .save()
        .then(result => {
            return User.findById(req.userId);
        })
        .then(user => {
            creator = user;
            user.classrooms = [classroom._id];
            return user.save();
        })
        .then(result => {
            res.status(201).json({ //201 status code means a resource was created successfully
                message: 'Classroom created successfully!',
                classroom: classroom,
                creator: {_id: creator._id, name: creator.name}
            });
        })
        .catch(err => console.log(err))
    ;
    
}

exports.getClassroom = (req, res, next) => {
    const classId = req.params.classId;
    Classroom
        .findById(classId)
        .then(classroom => {
            if (!classroom) {
                const error = new Error('Could not find classroom.');
                error.satusCode = 404;
                throw error;
            }
            res.satus(200).json({ message: 'Classroom fetched', classroom: classroom });
        })
        .catch(err => {
            if (!err.satusCode) {
                err.satusCode = 500;
            }
            next(err);  
        })
    ;
}

exports.updateClassroom = (req, res, next) => {
    const classId = req.params.classId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.satusCode = 422;
        throw error;
    }
    const clName = req.body.clName;
    const numOfStudents = req.body.numOfStudents;
    const size = req.body.size;
    Classroom
        .findById(classId)
        .then(classroom => {
            if(!classroom) {
                const error = new Error('Could not find classroom.');
                error.satusCode = 404;
                throw error;               
            }
            if (classroom.creator.toString() !== req.userId) {
                const error = new Error('Not authorized!');
                error.satusCode = 403;
                throw error;
            }
            classroom.clName = clName;
            classroom.numberOfStudents = numOfStudents;
            classroom.size = size;
            return classroom.save();
        })
        .then(result => {
            res.status(200).json({ message: 'Classroom!', classroom: result });
        })
        .catch(err => {
            if (!err.satusCode) {
                err.satusCode = 500;
            }
            next(err);           
        })
    ;
}

exports.deleteClassroom = (req, res, next) => {
    const classId = req.params.classId;
    Classroom
        .findById(classId)
        .then(classroom => {
            if(!classroom) {
                const error = new Error('Could not find classroom.');
                error.satusCode = 404;
                throw error;               
            }
            if (classroom.creator.toString() !== req.userId) {
                const error = new Error('Not authorized!');
                error.satusCode = 403;
                throw error;
            }
                //check logged in user
            return Classroom.findByIdAndRemove(classId);
        })
        .then(result => {
            return User.findById(req.userId);
        })
        .then(user => {
            user.classrooms = null;
            return user.save();
        })
        .then(result => {
            res.status(200).json({ message: 'Deleted classroom.', user: result })
        })
        .catch(err => {
            if (!err.satusCode) {
                err.satusCode = 500;
            }
            next(err);           
        })
    ;

}