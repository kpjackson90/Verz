const { errorType } = require("./errorConstants");

const getErrorCode = errorName => {
  return errorType[errorName];
};

module.exports = getErrorCode;
