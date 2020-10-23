const express = require('express');
const { body } = require('express-validator/check');

const teacherController = require('../controllers/teacher');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get(isAuth, teacherController.getTeachers);   

router.post(
    'createteacher',
    isAuth, 
    [
        body('firstName')
            .trim()
            .isLength({min: 10})
        ,
        body('lastName')
            .trim()
            .isLength({min: 10})
        ,
        body('classroomId')
            .trim()
            .isLength({min: 5})            
    ],
    teacherController.createTeacher
);

router.get('/getteacher/:teacherId', isAuth, teacherController.getTeacher);

router.put(
    '/updateteacher/:teacherId',
    isAuth,
    [
        body('firstName')
            .trim()
            .isLength({min: 10})
        ,
        body('lastName')
            .trim()
            .isLength({min: 10})
        ,
        body('classroomId')
            .trim()
            .isLength({min: 5})            
    ],
    teacherController.updateteacher
);

router.delete('/deleteteacher/:teacherId', isAuth, teacherController.deleteTeacher);

module.exports = router;