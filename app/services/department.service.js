/* models */
const departmentModel = require('../models/department.model');
const departmentMemberModel = require('../models/departmentMember.model');

// Create Department
exports.createDepartment = async department => await departmentModel.create(department);

// get All active Departments
exports.getAllActiveDepartments = async () => {
  return departmentModel.find({
    isDeleted: false,
  });
};

// get Departments
exports.getAllDepartments = async userId => {
  const departments = await departmentMemberModel.find({ userId: userId }).populate('departmentId');
  return departmentModel.find({
    _id: { $in: departments.map(department => department.departmentId) },
    isDeleted: false,
  });
};

// get department by name
exports.getDepartmentsByName = async name => {
  return departmentModel.findOne({
    departmentName: name,
    isDeleted: false,
  });
};

// get department by id
exports.getDepartmentById = async departmentId =>
  departmentModel.findOne({
    _id: departmentId,
  });

// check member is already exists
exports.checkMemberExists = async (departmentId, memberId) =>
  departmentMemberModel.findOne({
    departmentId: departmentId,
    memberId: memberId,
  });

// get department by member
exports.getDepartmentByMember = async userId => {
  return await departmentMemberModel.find({ memberId: userId }).populate('departmentId');
};

// get member by department id
exports.getMemberByDepartmentId = async departmentId =>
  await departmentMemberModel.find({ departmentId: departmentId }).populate('memberId');

// update department
exports.updateDepartment = async (departmentId, department) =>
  await departmentModel.findOneAndUpdate({ _id: departmentId }, { $set: department });

// delete department
exports.deleteDepartment = async departmentId =>
  await departmentModel.findOneAndUpdate({ _id: departmentId }, { $set: { isDeleted: true } });

// add member
exports.addMember = async (departmentId, memberId) =>
  await departmentMemberModel.create({ departmentId: departmentId, memberId: memberId });

// remove member
exports.removeMember = async (departmentId, memberId) =>
  await departmentMemberModel.findOneAndDelete({ departmentId: departmentId, memberId: memberId });

// retrive employee from department and location
exports.getDepartmentByNameAndLocation = async (departmentName, location) => {
  return departmentModel.find({
    departmentName: departmentName,
    location: {
      $regex: `^${location}`,
      $options: 'i', // Optional: case-insensitive search
    },
  });
};

// retrive employee from departmentmember table and descending order of employees name
exports.getDepartmentByNameAndEmployeeNames = async departmentName => {
  const departments = await departmentModel.find({
    departmentName: departmentName,
  });

  const departmentIds = departments.map(department => department._id);

  return departmentMemberModel
    .find({
      departmentId: { $in: departmentIds },
    })
    .populate('memberId')
    .sort({ 'memberId.firstName': -1 });
};

// retrive employee from It department and location start from A
exports.getEmployeeFromItDepartmentAndLocationStartFromA = async () => {
  return departmentModel.find({
    departmentName: 'IT',
    location: { $regex: '^A' },
  });
};

// Make a query that retrieves an employee/s who are in Sales department and descending order of employees name.
exports.getEmployeeFromSalesDepartmentAndDescendingOrderOfEmployeesName = async () => {
  return departmentModel
    .find({
      departmentName: 'Sales',
    })
    .sort({ employeeID: -1 });
};
