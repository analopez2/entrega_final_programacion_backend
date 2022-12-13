import passport from 'passport';
import local from 'passport-local';
import { usersService } from '../services/index.js';
import { createHash, isValidPassword } from '../utils.js';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    'register',
    new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, email, password, done) => {
      try {
        const { first_name, last_name, telefono, re_password } = req.body;
        if (password != re_password) return done(null, false);
        if (!first_name || !last_name || !email || !password) return done(null, false);
        let exists = await usersService.getUserByEmail(email);
        if (exists) return done(null, false);
        let result = await usersService.create({
          first_name,
          last_name,
          email,
          password: createHash(password),
          telefono: telefono,
        });
        return done(null, result);
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.use(
    'login',
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        if (!email || !password) return done(null, false);
        let user = await usersService.getUserByEmail(email);
        if (!user) return done(null, false);
        if (!isValidPassword(user, password)) return done(null, false);

        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let result = await usersService.getUserById(id);
    return done(null, result);
  });
};

export default initializePassport;
