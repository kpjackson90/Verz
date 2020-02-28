/* eslint-disable no-underscore-dangle */
exports.setUserInfo = request => {
  return {
    _id: request._id,
    role: request.role
  };
};
