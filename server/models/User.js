const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  userImage: {
    type: String
  },
  bio: {
    type: String
  },
  location: {
    type: String
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  ]
});

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

UserSchema.statics.follow = function(id) {
  if (this.following.indexOf(id) === -1) {
    this.following.push(id);
  } else {
    this.following.splice(this.following.indexOf(id), 1);
  }
};

UserSchema.statics.findFollowers = function(id) {
  return this.findById(id)
    .populate("followers")
    .then(user => user.followers);
};

mongoose.model("user", UserSchema);
