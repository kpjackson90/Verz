const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  facebookToken: String,
  googleToken: String,
  twitterToken: String,
  bio: String,
  location: String
});

mongoose.model("user", UserSchema);
