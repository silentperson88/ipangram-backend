const { validationResult } = require('express-validator');

// catch validation error.
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  // console.log('errors', errors);
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
    message: 'Required field cannot be empty.',
    status: false,
    data: {
      error: extractedErrors,
    },
  });
};
