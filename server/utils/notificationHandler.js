const mongoose = require('mongoose');
const User = mongoose.model('user');

exports.sendNotification = (action, item, user) => {
  return User.notify(action, item, user);
  //console.log(action + ' - ' + item + ' - ' + user._id);
};
