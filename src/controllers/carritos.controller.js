import { carritosService } from '../services/index.js';

const saveCarrito = async (req, res) => {
  try {
    const cart = await carritosService.saveCarrito();
    const cartId = cart.id;
    res.send({ id: cartId });
  } catch (error) {
    res.send({ status: 'error', error: error });
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
    res.send({ status: 'error', error: error });
  }
};

const getProductsByCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await carritosService.getCarritoById(id);
    res.send(cart.productos);
  } catch (error) {
    res.send({ status: 'error', error: error });
  }
};

const saveProductByCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId } = req.body;

    const cart = await carritosService.saveProductCart(id, productId);
    res.send(cart);
  } catch (error) {
    res.send({ status: 'error', error: error });
  }
};

const deletedProductByCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_prod } = req.params;

    const cart = await carritosService.deteteProductCart(id, id_prod);
    res.send(cart);
  } catch (error) {
    res.send({ status: 'error', error: error });
  }
};
export default {
  saveCarrito,
  deleteCarrito,
  getProductsByCarrito,
  saveProductByCarrito,
  deletedProductByCarrito,
};
