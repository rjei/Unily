const validateBody = (rules) => (req, res, next) => {
  const errors = [];

  rules.forEach((rule) => {
    const value = req.body[rule.field];
    if (rule.required && (value === undefined || value === null || value === '')) {
      errors.push(`${rule.field} is required`);
      return;
    }

    if (rule.validator && value !== undefined && !rule.validator(value)) {
      errors.push(rule.message || `${rule.field} is invalid`);
    }
  });

  if (errors.length > 0) {
    const err = new Error('Validation failed');
    err.statusCode = 400;
    err.details = errors;
    return next(err);
  }

  return next();
};

module.exports = validateBody;


