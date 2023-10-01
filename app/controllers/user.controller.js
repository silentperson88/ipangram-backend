/* packages */
const bcrypt = require('bcryptjs');
const constantUtils = require('../utils/constants.utils');
const { response } = require('../utils/response.utils');
const userService = require('../services/user.service');
const authMiddleware = require('../middlewares/auth.middleware');

// Create User
exports.signup = async (req, res) => {
  const reqBody = req.body;
  const { email, password, confirmPassword } = reqBody;
  try {
    const isExists = await userService.getUserByEmail(email.toLowerCase());

    if (isExists) {
      return response(res, 400, constantUtils.EMAIL_ALREADY_EXISTS);
    }

    if (password !== confirmPassword) {
      return response(res, 400, constantUtils.PASSWORD_MISMATCH);
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = {
      ...reqBody,
      password: hash,
    };

    const newUser = await userService.createUser(user);

    if (newUser) {
      return response(res, 200, constantUtils.USER_CREATED, newUser);
    }

    return response(res, 400, constantUtils.USER_CREATED_FAILED, newUser);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.getUserByEmail(email.toLowerCase());

    if (!user) {
      return response(res, 400, constantUtils.USER_NOT_REGISTERED);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return response(res, 400, constantUtils.INVALID_PASSWORD);
    }

    // Passing payload as userId to generate token.
    let token = await authMiddleware.assignToken(user);

    return response(res, 200, constantUtils.LOGIN_SUCCESS, { user, token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    // check requested user is manager or not
    const user = await userService.getUserById(req.userData._id);
    if (user.role !== 'manager') {
      return response(res, 400, constantUtils.USER_NOT_MANAGER);
    }
    const users = await userService.getAllUsers();

    response(res, 200, constantUtils.USER_RETRIVED, users);
  } catch (error) {
    res.status(500).json({ error });
  }
};
