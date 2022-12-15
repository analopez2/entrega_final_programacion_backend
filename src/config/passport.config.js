import passport from 'passport';
import local from 'passport-local';
import { carritosService, usersService } from '../services/index.js';
import { createHash, isValidPassword } from '../utils.js';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import mongoose from 'mongoose';

const adminId = mongoose.Types.ObjectId();
const adminCarritoId = mongoose.Types.ObjectId();

const LocalStrategy = local.Strategy;
const PRIVATE_KEY = 'llave-privada-token-JWT-00002020';
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'admin1234';

const initializePassport = () => {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PRIVATE_KEY,
  };

  passport.use(
    'register',
    new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, email, password, done) => {
      try {
        if (!req.file) return done(null, false);

        const { first_name, last_name, telefono, re_password, direccion } = req.body;
        if (password != re_password) return done(null, false);
        if (!first_name || !last_name || !email || !password) return done(null, false);
        let exists = await usersService.getUserByEmail(email);
        if (exists) return done(null, false);
        let carrito = await carritosService.saveCarrito();

        let result = await usersService.create({
          first_name,
          last_name,
          email,
          password: createHash(password),
          telefono: telefono,
          avatar: `${req.protocol}://${req.hostname}:8080/uploads/${req.file.filename}`,
          carrito: carrito._id,
          direccion: direccion,
        });

        return done(null, result);
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.use(
    'login',
    new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, email, password, done) => {
      try {
        if (req.session.user) return done(null, false);
        if (!email || !password) return done(null, false);
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          let user = {
            _id: adminId,
            email: email,
            first_name: 'Admin',
            last_name: '0001',
            telefono: '999999999',
            role: 'admin',
            avatar: '/uploads/avatar-descarga.png',
            carrito: adminCarritoId,
            direccion: '',
          };
          return done(null, user);
        }
        let user = await usersService.getUserByEmail(email);
        if (!user) return done(null, false);
        if (!isValidPassword(user, password)) return done(null, false);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.use(
    new JWTstrategy(jwtOptions, async (jwtData, done) => {
      try {
        const user = await usersService.getUserById(jwtData.id);
        if (!user) return done(null, false);

        done(null, user);
      } catch (error) {
        console.error(error);
        done(error);
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
