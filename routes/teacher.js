const express = require('express');

const teacherController = require('../controllers/teacher');
const isAuth = require('../middleware/is-auth');
const teacherValidator = require('../middleware/teacher-validator');

const router = express.Router();

router.get('/get-teachers', isAuth, teacherController.getTeachers);   

router.post(
    '/create-teacher',
    isAuth, 
    teacherValidator,
    teacherController.createTeacher
);

router.get('/get-teacher/:teacherId', isAuth, teacherController.getTeacher);

router.put(
    '/update-teacher/:teacherId',
    isAuth,
    teacherValidator,
    teacherController.updateteacher
);

router.delete('/delete-teacher/:teacherId', isAuth, teacherController.deleteTeacher);

module.exports = router;