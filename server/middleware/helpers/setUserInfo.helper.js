exports.setUserInfo = request => {
  return {
    _id: request._id,
    role: request.role
  };
};
