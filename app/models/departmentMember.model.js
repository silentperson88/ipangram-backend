const mongoose = require('mongoose');

// Department member Schema
const departmentMemberSchema = new mongoose.Schema({
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'department',
  },
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Department member Model
module.exports = mongoose.model('departmentMember', departmentMemberSchema);
