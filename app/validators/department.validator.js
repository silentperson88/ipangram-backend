const { body } = require('express-validator');

// Utils
const constantUtils = require('../utils/constants.utils');

exports.departmentValidationRule = () => {
  return [
    body('departmentName').isString().notEmpty().withMessage(constantUtils.INVALID_GROUP_NAME),
    body('categoryName').isString().notEmpty().withMessage(constantUtils.INVALID_GROUP_DESCRIPTION),
    body('location').isString().notEmpty().withMessage(constantUtils.INVALID_GROUP_DESCRIPTION),
    body('salary').isNumeric().notEmpty().withMessage(constantUtils.INVALID_GROUP_DESCRIPTION),
    body('employeeID').isString().notEmpty().withMessage(constantUtils.INVALID_GROUP_DESCRIPTION),
  ];
};
