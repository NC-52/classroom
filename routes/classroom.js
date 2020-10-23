const express = require('express');

const classroomController = require('../controllers/classroom');
const isAuth = require('../middleware/is-auth');
const classroomValidator = require('../middleware/classroom-validator');

const router = express.Router();

router.get('/getclasses', isAuth, classroomController.getClassrooms);   

router.post(
    '/createclass',
    isAuth, 
    classroomValidator,
    classroomController.createClassroom
);

router.get('/getclass/:classId', isAuth, classroomController.getClassroom);

router.put(
    '/updateclass/:classId',
    isAuth,
    classroomValidator,
    classroomController.updateClassroom
);

router.delete('/deleteclass/:classId', isAuth, classroomController.deleteClassroom);

module.exports = router;