const express = require('express');

const classroomController = require('../controllers/classroom');
const isAuth = require('../middleware/is-auth');
const classroomValidator = require('../middleware/classroom-validator');

const router = express.Router();

router.get(isAuth, classroomController.getClassrooms);   

router.post(
    isAuth, 
    classroomValidator,
    classroomController.createClassroom
);

router.get('/:classId', isAuth, classroomController.getClassroom);

router.put(
    '/:classId',
    isAuth,
    classroomValidator,
    classroomController.updateClassroom
);

router.delete('/:classId', isAuth, classroomController.deleteClassroom);

module.exports = router;