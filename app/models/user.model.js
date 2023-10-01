const mongoose = require('mongoose');

// Mobile User Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    enum: ['manager', 'employee'],
    default: 'manager',
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'male',
  },
  hobbies: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    default: '',
  },
});

// Mobile User Model
module.exports = mongoose.model('user', userSchema);
