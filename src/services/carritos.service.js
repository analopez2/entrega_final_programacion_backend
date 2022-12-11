import { productsService } from '../services/index.js';

const BASE_CART = {
  productos: [],
};

export default class CarritosService {
  constructor(dao) {
    this.dao = dao;
  }

  saveCarrito = () => {
    return this.dao.save(BASE_CART);
  };
  deleteById = (id) => {
    const cart = this.dao.getById(id);
    if (!cart) {
      throw { error: 'Carrito no encontrado' };
    }

    return this.dao.deleteById(id);
  };
  getCarritoById = async (id) => {
    let result = await this.dao.getById(id);
    if (!result) {
      throw { error: 'Carrito no encontrado' };
    }
    return result;
  };
  saveProductCart = (id, productId) => {
    const cart = this.dao.getById(id);
    if (!cart) {
      throw { error: 'Carrito no encontrado' };
    }
    const product = productsService.getProductById(productId);
    if (!product) {
      throw { error: 'Producto no encontrado' };
    }

    cart.productos.push(product);

    return this.dao.updateById(id, cart);
  };
  deteteProductCart = (id, productId) => {
    const cart = this.dao.getById(id);
    if (!cart) {
      throw { error: 'Carrito no encontrado' };
    }

    const product = cart.productos.find((e) => e.id == productId);

    if (!product) {
      throw { error: 'Producto no encontrado' };
    }

    cart.productos = cart.productos.filter((e) => e.id != id_prod);

    return this.dao.updateById(id, cart);
  };
}
