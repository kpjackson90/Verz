const mongoose = require('mongoose');
const User = mongoose.model('user');

exports.sendNotification = (action, user) => {
  return User.notify(action, user);
};
