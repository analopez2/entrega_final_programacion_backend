import { Router } from 'express';
import viewsController from '../controllers/views.controller.js';

const router = Router();

router.get('/', viewsController.home);
router.get('/register', viewsController.register);
router.get('/login', viewsController.login);
router.get('/logout', viewsController.logout);
router.get('/productos', viewsController.productos);

export default router;
