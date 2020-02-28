const { errorType } = require('./errorConstants');

const getErrorCode = ({ message }) => {
  return errorType[message];
};

module.exports = getErrorCode;
