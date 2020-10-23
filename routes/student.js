const express = require('express');

const studentController = require('../controllers/student');
const isAuth = require('../middleware/is-auth');
const studentValidator = require('../middleware/student-validator');

const router = express.Router();
 
router.get('/get-students', isAuth, studentController.getStudents);   

router.post(
    'create-student',
    isAuth, 
    studentValidator,
    studentController.createStudent
);

router.get('/get-student/:studentId', isAuth, studentController.getStudent);

router.put(
    '/update-student/:studentId',
    isAuth,
    studentValidator,
    studentController.updateStudent
);

router.delete('/delete-student/:studentId', isAuth, studentController.deleteStudent);

module.exports = router;