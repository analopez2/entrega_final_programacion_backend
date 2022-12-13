import { productsService } from '../services/index.js';
import { productValidation } from '../utils.js';

const getAllProducts = async (req, res) => {
  try {
    let productos = await productsService.getProducts();
    res.send(productos);
  } catch (error) {
    if (error.status) return res.status(error.status).send({ error: error });
    res.status(500).send({ status: 'error', error: error.message });
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
    if (error.status) return res.status(error.status).send({ error: error });
    res.status(500).send({ status: 'error', error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    let product = await productsService.getProductById(id);
    res.send(product);
  } catch (error) {
    if (error.status) return res.status(error.status).send({ error: error });
    res.status(500).send({ status: 'error', error: error.message });
  }
};

const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;

    const product = await productValidation.validateAsync({
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
    if (error.status) return res.status(error.status).send({ error: error });
    res.status(500).send({ status: 'error', error: error.message });
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
    if (error.status) return res.status(error.status).send({ error: error });
    res.status(500).send({ status: 'error', error: error.message });
  }
};

export default {
  getAllProducts,
  saveProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
