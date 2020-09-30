const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    bcrypt
        .hash(password, 12)
        .then(hasedPw => {
            const user = new User({
                email: email,
                password: hasedPw,
                name: name
            });
            return user.save();
        })
        .then(result => {
            res.status(201).json({ message: 'User created!', userId: result._id })
        })
        .catch(err => {
            if (!err.satusCode) {
                err.satusCode = 500;
            }
            next(err);
        })
    ;
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User
        .findOne({email: email})
        .then(user => {
            if (!user) {
                const error = new Error('A user with this email could not be found.');
                error.satusCode = 401; //401 is the status code for not authenticated
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
            //we compare the password the user entered to the hashed password
        })
        .then(isEqual => {
            if (!isEqual) {
                const error =new Error('Wrong password!');
                error.satusCode = 401;
                throw error;
            }
            const token = jwt.sign(
                {
                    email:  loadedUser.email,
                    userId: loadedUser._id.toString()
                },
                'somesupersecretsecret', //the secret we store has to be a long string hence its name
                { expiresIn: '1h' } //sets an expiry time for the token
            );
            //this creates a new signature and packs that into a new json web token
            res.status(200).json({ token: token, userId: loadedUser._id.toString() });
        })
        .catch(err => {
            if (!err.satusCode) {
                err.satusCode = 500;
            }
            next(err);
        })
}