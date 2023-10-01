/* models */
const userModel = require('../models/user.model');

/* create user */
exports.createUser = async user => {
  return await userModel.create(user);
};

/* get by email */
exports.getUserByEmail = async email => {
  return userModel.findOne({
    email: email,
  });
};

/* check user already exist by email, phone number, and uid */
exports.checkUserExist = async (email, panCardNumber, mobileNumber, uid) => {
  return userModel.findOne({
    $or: [
      { email: email },
      { panCardNumber: panCardNumber },
      { mobileNumber: mobileNumber },
      { uid: uid },
    ],
    isActive: true,
  });
};

/* get by id */
exports.getUserById = async userId => {
  console.log('userId', userId);
  return userModel.findOne({
    _id: userId,
  });
};

/* get all users */
exports.getAllUsers = async () => {
  return userModel.find();
};
