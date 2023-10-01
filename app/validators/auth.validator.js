const { body, validationResult } = require('express-validator');

// catch validation error.
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err =>
    extractedErrors.push({
      [err.param]: err.msg,
    })
  );

  return res.status(422).json({
    status: false,
    data: {
      error: extractedErrors,
    },
  });
};

const loginValidationRule = () => {
  return [
    body('email').isString().isEmail().withMessage('Please enter valid email.'),
    body('password')
      .isString()
      .isLength({ min: 6 })
      .withMessage('Password length should be at least 6 char.'),
  ];
};

const emailValidationRule = () => {
  return [body('email').isString().isEmail().withMessage('Please enter valid email.')];
};

module.exports = {
  validate,
  loginValidationRule,
  emailValidationRule,
};
