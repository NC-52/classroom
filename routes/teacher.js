const express = require('express');
const { body } = require('express-validator/check');

const teacherController = require('../controllers/teacher');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

//GET /feed/posts
router.get('/teachers', isAuth, teacherController.getTeachers);   

//POST //post
router.post(
    '/teachers',
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

router.get('/teachers/:teacherId', isAuth, teacherController.getTeacher);

router.put(
    '/teachers/:teacherId',
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
//the put http method is using if we want to replace a resource; can only be sent through async requests triggered by js

router.delete('/teachers/:teacherId', isAuth, teacherController.deleteTeacher);

module.exports = router;