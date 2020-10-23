const { body } = require('express-validator/check');

const classValidator = [
    body('clName')
        .trim()
        .isLength({min: 10})
    ,
    body('numOfStudents')
        .trim()
        .isLength({min: 10})
    ,
    body('size')
        .trim()
        .isLength({min: 5})            
]

module.exports = classValidator;