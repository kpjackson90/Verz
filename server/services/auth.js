const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const jwt = require("jsonwebtoken");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { generateToken } = require("../middleware/helpers/generateToken.helper");
const { setUserInfo } = require("../middleware/helpers/setUserInfo.helper");
const keys = require("../config/keys");

const User = mongoose.model("user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: keys.JWT_SECRET
    },
    function(jwtPayload, cb) {
      return User.findOne({ _id: jwtPayload._id })
        .then(user => {
          return cb(null, user);
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, "Invalid Credentials");
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, "Invalid credentials.");
        });
      });
    }
  )
);

async function createUser({ email, password, req }) {
  const user = new User({ email, password });

  if (!email || !password) {
    throw new Error("You must provide an email and password");
  }
  return User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        throw new Error("Email in use");
      }
      return user.save();
    })
    .then(user => {
      return new Promise((resolve, reject) => {
        req.logIn(user, err => {
          if (err) {
            return reject(err);
          }

          const userInfo = setUserInfo(user);
          const token = generateToken(userInfo);

          resolve({
            id: user.id,
            email,
            token
          });
        });
      });
    });
}

async function login({ email, password }) {
  return new Promise((resolve, reject) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return reject("Invalid user");
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return user;
          }
          return done(null, false, "Invalid credentials.");
        });

        const userInfo = setUserInfo(user);
        const token = generateToken(userInfo);

        resolve({ id: user.id, token, email });
      })
      .catch(error => {
        reject(error);
      });
  });
}

async function verifyToken({ token }) {
  try {
    const decoded = jwt.verify(token, keys.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });
    return { ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
}

module.exports = { createUser, login, verifyToken };
