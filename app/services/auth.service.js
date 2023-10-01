const User = require('../models/user.model');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

/**
 * Get user by email
 *
 * @param {*} mail
 * @returns
 */
exports.getUserByEmail = async mail => {
  return await User.findOne({ email: mail, isDeleted: false });
};

/**
 * Get user by id
 *
 * @param {*} userId
 * @returns
 */
exports.getUserById = async userId => {
  return await User.findById(mongoose.Types.ObjectId(userId)).select('-password');
};

/**
 * Update Password By Id
 *
 * @param {*} id
 * @param {*} hashPassword
 * @returns
 */
exports.updatePasswordById = async (id, hashPassword) => {
  return await User.findByIdAndUpdate(mongoose.Types.ObjectId(id), {
    $set: { password: hashPassword, resetToken: '' },
  });
};

/**
 * Decode JWT Token
 *
 * @param {*} token
 * @returns
 */
exports.decodeJwtToken = async token => {
  return await jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
};

/**
 * get user data by filter
 *
 * @param {*} filter
 * @returns
 */
exports.getUserDataByFilter = async filter => {
  return await User.findOne(filter, { _id: 1, firstName: 1, lastName: 1, email: 1, role: 1 });
};
