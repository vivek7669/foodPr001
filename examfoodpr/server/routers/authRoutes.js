const {Router} = require('express');
const { signup, login } = require('../controllers/authController');
const authroute = Router();

// User signup
authroute.post('/signup', signup);

// User login
authroute.post('/login', login);

module.exports = authroute;
