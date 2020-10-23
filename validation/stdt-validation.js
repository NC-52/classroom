const { body } = require('express-validator/check');

const studentValidation = [
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
]

module.exports = studentValidation;