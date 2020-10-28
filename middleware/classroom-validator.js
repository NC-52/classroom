const { body } = require('express-validator/check');

const validator = [
    body('clName')
        .trim()
        .isLength({max: 15})
    ,
    body('numOfStudents')
        .trim()
        .isInt({min: 5})
    ,
    body('size')
        .trim()
        .isInt({max: 10})            
]

module.exports = validator;