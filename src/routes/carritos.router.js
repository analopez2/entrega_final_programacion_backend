import { Router } from 'express';
import carritosController from '../controllers/carritos.controller.js';

const router = Router();

router.post('/', carritosController.saveCarrito);
router.delete('/:id', carritosController.deleteCarrito);
router.get('/:id/productos', carritosController.getProductsByCarrito);
router.post('/:id/productos', carritosController.saveProductByCarrito);
router.delete('/:id/productos/:id_prod', carritosController.deletedProductByCarrito);

export default router;
