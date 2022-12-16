import { Router } from 'express';
import passport from 'passport';
import sessionController from '../controllers/session.controller.js';
import { uploader } from '../config/multer.config.js';

const router = Router();

router.post(
  '/register',
  uploader.single('avatar'),
  passport.authenticate('register', { failureRedirect: '/api/sessions/registerfail', failureMessage: true }),
  sessionController.registerUser,
);
router.get('/registerfail', sessionController.registerFail);
router.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/api/sessions/loginfail', failureMessage: true }),
  sessionController.loginUser,
);
router.get('/loginfail', sessionController.loginFail);
router.get('/logout', sessionController.logoutUser);

export default router;
