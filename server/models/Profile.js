const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  username: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  location: {
    type: String
  },
  followers: [
    {
      type: Number,
      default: 0
    }
  ],
  following: [
    {
      type: Number,
      default: 0
    }
  ]
});

mongoose.model("profile", ProfileSchema);
