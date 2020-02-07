const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificationSchema = new Schema({
  sentAt: {
    type: Date,
    default: Date.now
  },
  message: {
    type: String
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'post'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

mongoose.model('notification', NotificationSchema);
