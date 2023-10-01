const express = require('express');
const routes = express.Router();
const userController = require('../controllers/user.controller');
const { validate } = require('../middlewares/validate.middleware');
const validator = require('../validators/admin.validator');
const { verifyToken } = require('../middlewares/auth.middleware');

// get user
routes.get('/', verifyToken, validate, userController.getAllUsers);

// signup User
routes.post('/signup', validator.createUserValidationRule(), validate, userController.signup);

// Login User
routes.post('/login', validator.loginValidationRule(), validate, userController.login);

module.exports = routes;
