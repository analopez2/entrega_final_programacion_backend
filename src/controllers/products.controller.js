import { productsService } from '../services/index.js';
import { productValidation } from '../utils.js';

const getAllProducts = async (req, res) => {
  try {
    let productos = await productsService.getProducts();
    res.send(productos);
  } catch (error) {
    res.send({ status: 'error', error: error });
  }
};
const saveProduct = async (req, res) => {
  try {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const product = await productValidation.validateAsync({
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    });

    let result = await productsService.saveProduct(product);
    res.send(result);
  } catch (error) {
    res.send({ status: 'error', error: error });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    let product = await productsService.getProductById(id);
    res.send(product);
  } catch (error) {
    res.send({ status: 'error', error: error });
  }
};

const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;

    const product = await JOI_VALIDATOR.product.validateAsync({
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    });

    let productUpdate = await productsService.updateProductById(id, product);
    res.send(productUpdate);
  } catch (error) {
    res.send({ status: 'error', error: error });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const productDelete = await productsService.deleteById(id);

    res.send({
      mensaje: 'Producto eliminado',
      productoEliminado: productDelete,
    });
  } catch (error) {
    res.send({ status: 'error', error: error });
  }
};

export default {
  getAllProducts,
  saveProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
