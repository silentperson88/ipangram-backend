/* packages */
const constantUtils = require('../utils/constants.utils');
const { response } = require('../utils/response.utils');
const departmentService = require('../services/department.service');
const userService = require('../services/user.service');

// Create Department
exports.createDepartment = async (req, res) => {
  const reqBody = req.body;
  const { departmentName, categoryName, location, salary, employeeID } = reqBody;
  try {
    // User is manager or not
    const user = await userService.getUserById(req.userData._id);
    if (user.role !== 'manager') {
      return response(res, 400, constantUtils.USER_NOT_MANAGER);
    }

    const isExists = await departmentService.getDepartmentsByName(departmentName);
    if (isExists) {
      return response(res, 400, constantUtils.DEPARTMENT_ALREADY_EXISTS);
    }
    const department = {
      departmentName,
      categoryName,
      location,
      salary,
      employeeID,
    };
    const newDepartment = await departmentService.createDepartment(department);
    if (newDepartment) {
      return response(res, 200, constantUtils.DEPARTMENT_CREATED, newDepartment);
    }
    return response(res, 400, constantUtils.DEPARTMENT_CREATED_FAILED, newDepartment);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// get all active departments
exports.getAllDepartments = async (req, res) => {
  try {
    const user = await userService.getUserById(req.userData._id);
    if (user.role !== 'manager') {
      return response(res, 400, constantUtils.USER_NOT_MANAGER);
    }
    const departments = await departmentService.getAllActiveDepartments();
    if (departments) {
      return response(res, 200, constantUtils.DEPARTMENT_FETCHED, departments);
    }
    return response(res, 400, constantUtils.DEPARTMENT_FETCHED_FAILED);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// get members by department id
exports.getMemberByDepartmentId = async (req, res) => {
  try {
    const user = await userService.getUserById(req.userData._id);
    if (user.role !== 'manager') {
      return response(res, 400, constantUtils.USER_NOT_MANAGER);
    }
    const members = await departmentService.getMemberByDepartmentId(req.params.departmentId);
    if (members) {
      return response(res, 200, constantUtils.DEPARTMENT_FETCHED, members);
    }
    return response(res, 400, constantUtils.DEPARTMENT_FETCHED_FAILED);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// get department by member
exports.getDepartmentByMember = async (req, res) => {
  try {
    const departments = await departmentService.getDepartmentByMember(req.userData._id);
    if (departments) {
      return response(res, 200, constantUtils.DEPARTMENT_FETCHED, departments);
    }
    return response(res, 400, constantUtils.DEPARTMENT_FETCHED_FAILED);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// update department
exports.updateDepartment = async (req, res) => {
  const reqBody = req.body;
  const { departmentId } = req.params;
  try {
    const isExists = await departmentService.getDepartmentById(departmentId);
    if (!isExists) {
      return response(res, 400, constantUtils.DEPARTMENT_NOT_FOUND);
    }
    const department = {
      departmentName: reqBody.departmentName,
      categoryName: reqBody.categoryName,
      location: reqBody.location,
      salary: reqBody.salary,
      employeeID: reqBody.employeeID,
    };
    const updatedDepartment = await departmentService.updateDepartment(departmentId, department);
    if (updatedDepartment) {
      return response(res, 200, constantUtils.DEPARTMENT_UPDATED, updatedDepartment);
    }
    return response(res, 400, constantUtils.DEPARTMENT_UPDATED_FAILED, updatedDepartment);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// delete department
exports.deleteDepartment = async (req, res) => {
  try {
    const user = await userService.getUserById(req.userData._id);
    if (user.role !== 'manager') {
      return response(res, 400, constantUtils.USER_NOT_MANAGER);
    }
    const department = await departmentService.updateDepartment(req.params.departmentId, {
      isDeleted: true,
    });
    if (department) {
      return response(res, 200, constantUtils.DEPARTMENT_DELETED);
    }
    return response(res, 400, constantUtils.DEPARTMENT_DELETED_FAILED);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// add member
exports.addMember = async (req, res) => {
  try {
    const user = await userService.getUserById(req.userData._id);

    if (user.role !== 'manager') {
      return response(res, 400, constantUtils.USER_NOT_MANAGER);
    }

    const isDepartmentExists = await departmentService.getDepartmentById(req.params.departmentId);

    if (!isDepartmentExists) {
      return response(res, 400, constantUtils.DEPARTMENT_NOT_FOUND);
    }

    const memberList = req.body.memberList;

    if (!memberList) {
      return response(res, 400, constantUtils.MEMBER_LIST_REQUIRED);
    }

    const addedMembers = []; // Keep track of successfully added members

    for (const element of memberList) {
      const isMemberExists = await userService.getUserById(element);

      if (!isMemberExists) {
        return response(res, 400, constantUtils.MEMBER_NOT_FOUND);
      }

      const isMemberInDepartment = await departmentService.checkMemberExists(
        req.params.departmentId,
        element
      );

      if (isMemberInDepartment) {
        // Skip duplicate members and continue with the loop
        continue;
      }

      const department = await departmentService.addMember(req.params.departmentId, element);

      if (!department) {
        return response(res, 400, constantUtils.DEPARTMENT_MEMBER_ADDED_FAILED);
      }

      // Track the successfully added members
      addedMembers.push(element);
    }

    if (addedMembers.length > 0) {
      return response(res, 200, `${addedMembers.length} members added to the department.`);
    } else {
      return response(res, 200, constantUtils.NO_NEW_MEMBERS_ADDED);
    }
  } catch (error) {
    // Properly handle errors and send an error response
    return response(res, 500, 'Internal Server Error');
  }
};

// remove member
exports.removeMember = async (req, res) => {
  try {
    const user = await userService.getUserById(req.userData._id);

    if (user.role !== 'manager') {
      return response(res, 400, constantUtils.USER_NOT_MANAGER);
    }

    const isDepartmentExists = await departmentService.getDepartmentById(req.params.departmentId);

    if (!isDepartmentExists) {
      return response(res, 400, constantUtils.DEPARTMENT_NOT_FOUND);
    }

    const isMemberInDepartment = await departmentService.checkMemberExists(
      req.params.departmentId,
      req.params.memberId
    );
    if (!isMemberInDepartment) {
      return response(res, 400, constantUtils.MEMBER_NOT_IN_DEPARTMENT);
    }

    const department = await departmentService.removeMember(
      req.params.departmentId,
      req.params.memberId
    );
    if (department) {
      return response(res, 200, constantUtils.DEPARTMENT_MEMBER_REMOVED, department);
    }
    return response(res, 400, constantUtils.DEPARTMENT_MEMBER_REMOVED_FAILED);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// get department by name  and location start from A
exports.getDepartmentByNameAndLocations = async (req, res) => {
  try {
    const { departmentName, location } = req.params;
    const departments = await departmentService.getDepartmentByNameAndLocation(
      departmentName,
      location
    );
    if (departments) {
      return response(res, 200, constantUtils.DEPARTMENT_FETCHED, departments);
    }
    return response(res, 400, constantUtils.DEPARTMENT_FETCHED_FAILED);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// get department by name and employees name in descending order
exports.getDepartmentByNameAndEmployeeNames = async (req, res) => {
  try {
    const { departmentName } = req.params;
    const departments = await departmentService.getDepartmentByNameAndEmployeeNames(departmentName);
    if (departments) {
      return response(res, 200, constantUtils.DEPARTMENT_FETCHED, departments);
    }
    return response(res, 400, constantUtils.DEPARTMENT_FETCHED_FAILED);
  } catch (error) {
    res.status(500).json({ error });
  }
};
