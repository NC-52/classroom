const express = require('express');

const teacherController = require('../controllers/teacher');
const isAuth = require('../middleware/is-auth');
const teacherValidator = require('../middleware/teacher-validator');

const router = express.Router();

router.get(isAuth, teacherController.getTeachers);   

router.post(isAuth, teacherValidator, teacherController.createTeacher);

router.get('/:teacherId', isAuth, teacherController.getTeacher);

router.put('/:teacherId', isAuth, teacherValidator, teacherController.updateteacher);

router.delete('/:teacherId', isAuth, teacherController.deleteTeacher);

module.exports = router;