const express = require('express');
const { body } = require('express-validator/check');

const classroomController = require('../controllers/classroom');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

//GET /feed/posts
router.get('/classrooms', isAuth, classroomController.getClassrooms);   

//POST //post
router.post(
    '/classrooms',
    isAuth, 
    [
        body('clRoom')
            .trim()
            .isLength({min: 10})
        ,
        body('numOfStudents')
            .trim()
            .isLength({min: 10})
        ,
        body('size')
            .trim()
            .isLength({min: 5})            
    ],
    classroomController.createClassroom
);

router.get('/classrooms/:classId', isAuth, classroomController.getClassroom);

router.put(
    '/classrooms/:classId',
    isAuth,
    [
        body('clRoom')
            .trim()
            .isLength({min: 10})
        ,
        body('numOfStudents')
            .trim()
            .isLength({min: 10})
        ,
        body('size')
            .trim()
            .isLength({min: 5})            
    ],
    classroomController.updateClassroom
);
//the put http method is using if we want to replace a resource; can only be sent through async requests triggered by js

router.delete('/classrooms/:classId', isAuth, classroomController.deleteClassroom);

module.exports = router;