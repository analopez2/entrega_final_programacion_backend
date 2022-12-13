import { Router } from 'express';
import productsController from '../controllers/products.controller.js';

const router = Router();

router.get('/', productsController.getAllProducts);
router.post('/', productsController.saveProduct);
router.get('/:id', productsController.getProductById);
router.put('/:id', productsController.updateProductById);
router.delete('/:id', productsController.deleteProductById);

export default router;
