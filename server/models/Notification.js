const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificationSchema = new Schema({
  notificationType: {
    type: String
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  receivers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  message: {
    type: String
  }
});

mongoose.model('notification', NotificationSchema);
