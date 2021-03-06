const { body } = require('express-validator/check');

const User = require('../models/user');

const authValid = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, { req }) => {
            return User
                .findOne({email: value})
                .then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('E-mail address already exists!')
                    }
                })
            ;
        })
        /*the custom validator method takes a function as an argument which retrieves the value we are looking at,
        and an object from which we can extract the request as a property with the destructuring syntax */
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({min: 5})
    ,
    body('name')
        .trim()
        .not()
        .isEmpty()
]

module.exports = authValid;