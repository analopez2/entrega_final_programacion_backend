import { Router } from 'express';
import carritosController from '../controllers/carritos.controller.js';
import { login } from '../middlewares/login.js';

const router = Router();

router.get('/', login, carritosController.getProductsByCarrito);
router.delete('/:id', login, carritosController.vaciarCarrito);
router.post('/:id/productos', login, carritosController.saveProductByCarrito);
router.delete('/:id/productos/:id_prod', login, carritosController.deletedProductByCarrito);

export default router;
