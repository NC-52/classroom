const express = require('express');

const authController = require('../controllers/auth');
const authValidator = require('../middleware/auth-validator');

const router = express.Router();

//router.put(
router.post(
    '/signup', 
    authValidator, 
    authController.signup
);

router.post('/login', authController.login);

module.exports = router;