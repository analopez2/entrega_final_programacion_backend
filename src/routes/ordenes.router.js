import { Router } from 'express';
import ordenesController from '../controllers/ordenes.controller.js';
import { login } from '../middlewares/login.js';

const router = Router();

router.post('/', login, ordenesController.finalizarOrden);

export default router;
