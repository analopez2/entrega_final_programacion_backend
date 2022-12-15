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
  getCarritoById = async (id) => {
    let result = await this.dao.getById(id);
    if (!result) throw { status: 404, error: 'Carrito no encontrado' };

    return result;
  };
  saveProductCart = async (id, productId) => {
    const cart = await this.dao.getById(id);
    if (!cart) throw { status: 404, error: 'Carrito no encontrado' };

    const productInput = await productsService.getProductById(productId);
    if (!productInput) throw { status: 404, error: 'Producto no encontrado' };

    const product = { producto: productInput, cantidad: 1 };

    if (cart.productos.length >= 0) {
      const existeProducto = cart.productos.find((p) => p.producto._id == productId);
      if (existeProducto) existeProducto.cantidad++;
      else cart.productos.push(product);
    }

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
  vaciarCarrito = async (id) => {
    let result = await this.dao.getById(id);
    if (!result) throw { status: 404, error: 'Carrito no encontrado' };

    return await this.dao.updateById(id, BASE_CART);
  };
}
