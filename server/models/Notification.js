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

NotificationSchema.statics.getNotifications = async function(id) {
  try {
    const User = mongoose.model('user');
    const currentUser = await User.findById({ _id: id });
    const { notifications } = currentUser;

    const existingNotification = await Promise.all(
      notifications.map(
        async notification_id => await this.findOne({ _id: notification_id })
      )
    );

    return existingNotification;
  } catch (err) {
    console.log(err);
  }
};

mongoose.model('notification', NotificationSchema);
