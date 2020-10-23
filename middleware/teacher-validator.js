const { body } = require('express-validator/check');

const validator = [
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
]

module.exports = validator;