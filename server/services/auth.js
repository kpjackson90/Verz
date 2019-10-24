const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { generateToken, setUserInfo } = require("../middleware/helpers.js");

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
      secretOrKey: "randomJWTstringwasinsertedherefortesting"
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
    { usernameField: "username" },
    (username, password, done) => {
      User.findOne({ username: username.toLowerCase() }, (err, user) => {
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

async function createUser({ username, password, req }) {
  const user = new User({ username, password });

  if (!username || !password) {
    throw new Error("You must provide a username and password");
  }
  return User.findOne({ username })
    .then(existingUser => {
      if (existingUser) {
        throw new Error("Username in use");
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
            username,
            token
          });
        });
      });
    });
}

async function login({ username, password }) {
  return new Promise((resolve, reject) => {
    User.findOne({ username })
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

        resolve({ id: user.id, token, username });
      })
      .catch(error => {
        reject(error);
      });
  });
}

async function verifyToken({ token }) {
  try {
    const decoded = jwt.verify(token, "insertsecrethere");
    const user = await User.findOne({ _id: decoded.id });
    return { ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
}

module.exports = { createUser, login, verifyToken };
