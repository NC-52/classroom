const express = require('express');

const studentController = require('../controllers/student');
const isAuth = require('../middleware/is-auth');
const studentValidator = require('../middleware/student-validator');

const router = express.Router();
 
router.get(isAuth, studentController.getStudents);   

router.post(isAuth, studentValidator, studentController.createStudent);

router.get('/:studentId', isAuth, studentController.getStudent);

router.put('/:studentId', isAuth, studentValidator, studentController.updateStudent);

router.delete('/:studentId', isAuth, studentController.deleteStudent);

module.exports = router;