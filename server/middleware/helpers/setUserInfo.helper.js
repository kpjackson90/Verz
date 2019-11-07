exports.setUserInfo = request => {
  return {
    _id: request._id,
    email: request.email
  };
};
