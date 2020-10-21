const express = require('express');

const classroomController = require('../controllers/classroom');
const isAuth = require('../middleware/is-auth');
const classroomValidator = require('../middleware/classroom-validator');

const router = express.Router();

//GET /feed/posts
router.get('/classrooms', isAuth, classroomController.getClassrooms);   

//POST //post
router.post(
    '/classrooms',
    isAuth, 
    classroomValidator,
    classroomController.createClassroom
);

router.get('/classrooms/:classId', isAuth, classroomController.getClassroom);

router.put(
    '/classrooms/:classId',
    isAuth,
    classroomValidator,
    classroomController.updateClassroom
);
//the put http method is using if we want to replace a resource; can only be sent through async requests triggered by js

router.delete('/classrooms/:classId', isAuth, classroomController.deleteClassroom);

module.exports = router;