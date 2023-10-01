const express = require('express');
const routes = express.Router();
const departmentController = require('../controllers/department.controller');
const { validate } = require('../middlewares/validate.middleware');
const { verifyToken } = require('../middlewares/auth.middleware');
const { departmentValidationRule } = require('../validators/department.validator');

// create department
routes.post(
  '',
  verifyToken,
  departmentValidationRule(),
  validate,
  departmentController.createDepartment
);

// get department by member id
routes.get('/', verifyToken, validate, departmentController.getDepartmentByMember);

// update department
routes.patch('/:departmentId', verifyToken, validate, departmentController.updateDepartment);

// delete department
routes.delete('/:departmentId', verifyToken, validate, departmentController.deleteDepartment);

// get department
routes.get('/list', verifyToken, validate, departmentController.getAllDepartments);

// get member by department id
routes.get('/:departmentId', verifyToken, validate, departmentController.getMemberByDepartmentId);

// delete department
routes.delete('/:departmentId', verifyToken, validate, departmentController.deleteDepartment);

// add member
routes.post('/:departmentId/add-members', verifyToken, validate, departmentController.addMember);

// remove member
routes.delete(
  '/:departmentId/members/:memberId',
  verifyToken,
  validate,
  departmentController.removeMember
);

// get department by name and employees name in descending order
routes.get(
  '/:departmentName/descending-order-employees',
  verifyToken,
  validate,
  departmentController.getDepartmentByNameAndEmployeeNames
);

// get department by name and location
routes.get(
  '/:departmentName/:location',
  verifyToken,
  validate,
  departmentController.getDepartmentByNameAndLocations
);

module.exports = routes;
