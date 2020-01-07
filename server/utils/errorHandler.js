const { errorType } = require("./errorHandler");

const getErrorCode = errorName => {
  return errorType[errorName];
};

module.exports = getErrorCode;
