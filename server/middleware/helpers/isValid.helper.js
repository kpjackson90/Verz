exports.isValid = user => {
  if (user) {
    if (user.role === 'admin' || user.role === 'user') {
      return true;
    }
  }
  return false;
};
