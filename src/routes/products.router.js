import { Router } from 'express';
import productsController from '../controllers/products.controller.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { login } from '../middlewares/login.js';

const router = Router();

router.get('/', login, productsController.getAllProducts);
router.post('/', login, isAdmin, productsController.saveProduct);
router.get('/:id', login, productsController.getProductById);
router.put('/:id', login, isAdmin, productsController.updateProductById);
router.delete('/:id', login, isAdmin, productsController.deleteProductById);

export default router;
