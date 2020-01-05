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
    type: String
  },
  userImage: {
    type: String
  },
  bio: {
    type: String
  },
  image: {
    type: String
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Article"
    }
  ],
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

UserSchema.statics.favorite = function(id) {};
