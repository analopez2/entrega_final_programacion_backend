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
  deleteById = async (id) => {
    let result = await this.dao.getById(id);
    if (!result) throw { status: 404, error: 'Carrito no encontrado' };

    return this.dao.deleteById(id);
  };
  getCarritoById = async (id) => {
    let result = await this.dao.getById(id);
    if (!result) throw { status: 404, error: 'Carrito no encontrado' };

    return result;
  };
  saveProductCart = async (id, productId) => {
    const cart = await this.dao.getById(id);
    if (!cart.id) throw { status: 404, error: 'Carrito no encontrado' };

    const product = await productsService.getProductById(productId);
    if (!product) throw { status: 404, error: 'Producto no encontrado' };

    cart.productos.push(product);

    return this.dao.updateById(id, cart);
  };
  deteteProductCart = async (id, productId) => {
    const cart = await this.dao.getById(id);
    if (!cart) throw { status: 404, error: 'Carrito no encontrado' };

    const product = cart.productos.find((e) => e.id == productId);

    if (!product) throw { status: 404, error: 'Producto no encontrado' };

    cart.productos = cart.productos.filter((e) => e.id != productId);

    return this.dao.updateById(id, cart);
  };
}
