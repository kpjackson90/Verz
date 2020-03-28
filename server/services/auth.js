/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { generateToken } = require('../middleware/helpers/generateToken.helper');
const { setUserInfo } = require('../middleware/helpers/setUserInfo.helper');
const keys = require('../config/keys');
const { errorName } = require('../utils/errorConstants');

const User = mongoose.model('user');

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
    // eslint-disable-next-line func-names
    async function(jwtPayload, cb) {
      try {
        // eslint-disable-next-line no-underscore-dangle
        const user = await User.findOne({ _id: jwtPayload._id });
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    (email, password, done) => {
      // eslint-disable-next-line consistent-return
      User.findOne({ email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, errorName.INVALID);
        }
        // eslint-disable-next-line no-shadow
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, errorName.INVALID);
        });
      });
    }
  )
);

function createUser({ email, password, req }) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const user = new User({ email, password });

      if (!email || !password) {
        throw new Error(errorName.EP_NOT_PROVIDED);
      }
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error(errorName.EMAIL_IN_USE);
      }
      await user.save();
      // console.log('new user', user);

      req.logIn(user, async err => {
        if (err) {
          throw new Error(err);
        }
        const { id, role } = user;
        const userInfo = setUserInfo(user);
        const token = `Bearer ${await generateToken(userInfo)}`;
        console.log('insider here');
        return resolve({ id, email, role, token });
      });
    } catch (err) {
      return reject(err);
    }
  });
}

async function login({ email, password, req }) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', { session: false }, async (err, user) => {
      try {
        if (err) {
          throw new Error(err);
        }

        if (!user) {
          throw new Error(errorName.INVALID);
        }

        req.logIn(user, async err => {
          if (err) {
            throw new Error(err);
          }
          const userInfo = setUserInfo(user);
          const token = `Bearer  ${await generateToken(userInfo)}`;
          return resolve({ id: user.id, email, token });
        });
        // eslint-disable-next-line no-shadow
      } catch (err) {
        reject(err);
      }
    })({ body: { email, password } }); // end of passport authenticate
  });
}

async function verifyToken({ token }) {
  // eslint-disable-next-line no-useless-catch
  try {
    const decoded = jwt.verify(token, keys.JWT_SECRET);
    // eslint-disable-next-line no-underscore-dangle
    const user = await User.findOne({ _id: decoded._id });
    return { ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
}

module.exports = { createUser, login, verifyToken };
