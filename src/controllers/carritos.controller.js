import { carritosService } from '../services/index.js';

const saveCarrito = async (req, res) => {
  try {
    const cart = await carritosService.saveCarrito();
    const cartId = cart.id;
    res.send({ id: cartId });
  } catch (error) {
    if (error.status) return res.status(error.status).send({ error: error });
    res.status(500).send({ status: 'error', error: error.message });
  }
};

const deleteCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const carritoDelete = await carritosService.deleteById(id);

    res.send({
      mensaje: 'Carrito eliminado',
      carritoEliminado: carritoDelete,
    });
  } catch (error) {
    if (error.status) return res.status(error.status).send({ error: error });
    res.status(500).send({ status: 'error', error: error.message });
  }
};

const getProductsByCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await carritosService.getCarritoById(id);
    res.send(cart.productos);
  } catch (error) {
    if (error.status) return res.status(error.status).send({ error: error });
    res.status(500).send({ status: 'error', error: error.message });
  }
};

const saveProductByCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id } = req.body;

    const cart = await carritosService.saveProductCart(id, product_id);
    res.send(cart);
  } catch (error) {
    if (error.status) return res.status(error.status).send({ error: error });
    res.status(500).send({ status: 'error', error: error.message });
  }
};

const deletedProductByCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_prod } = req.params;

    const cart = await carritosService.deteteProductCart(id, id_prod);
    res.send(cart);
  } catch (error) {
    if (error.status) return res.status(error.status).send({ error: error });
    res.status(500).send({ status: 'error', error: error.message });
  }
};
export default {
  saveCarrito,
  deleteCarrito,
  getProductsByCarrito,
  saveProductByCarrito,
  deletedProductByCarrito,
};
