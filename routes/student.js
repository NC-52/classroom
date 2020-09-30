const express = require('express');
const { body } = require('express-validator/check');

const studentController = require('../controllers/student');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

//GET 
router.get('/students', isAuth, studentController.getStudents);   

//POST 
router.post(
    '/students',
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
        body('grade')
            .trim()
            .isLength({min: 2})
        ,
        body('classId')
            .trim()
            .isLength({min: 5})            
    ],
    studentController.createStudent
);

router.get('/students/:studentId', isAuth, studentController.getStudent);

router.put(
    '/students/:studentId',
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
        body('grade')
            .trim()
            .isLength({min: 2})
        ,
        body('classId')
            .trim()
            .isLength({min: 5})            
    ],
    studentController.updateStudent
);
//the put http method is using if we want to replace a resource; can only be sent through async requests triggered by js

router.delete('/students/:studentId', isAuth, studentController.deleteStudent);

module.exports = router;