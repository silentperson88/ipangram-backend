const mongoose = require('mongoose');

// Department Schema
const departmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    default: '',
  },
  categoryName: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
  salary: {
    type: String,
    default: '',
  },
  employeeID: {
    type: String,
    default: '',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Department Model
module.exports = mongoose.model('department', departmentSchema);
