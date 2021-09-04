const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const db = require('../sequelize').db

module.exports.initPassport = function (app) {

  app.use(passport.initialize());

  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  },
    function (jwtPayload, done) {
      return done(null, jwtPayload);
    }
  ));
  passport.use('local',
    new LocalStrategy(
      {
        usernameField: "userName",
        passwordField: "password",
        session: false
      },
      async (userName, password, done) => {
        var user = await db.User.findOne({ where: { userName: userName } })
        if (!user) {
          // Username doesn't exist
          return done(null, false, { message: 'Incorrect userName or password' })
        }
        if (!user.validPassword(password)) {
          // Password doesn't match
          return done(null, false, { message: 'Incorrect userName or password' })
        }
        done(null, { id: user.id, userName: user.userName });
      }
    )
  )
}

module.exports.passport = passport
