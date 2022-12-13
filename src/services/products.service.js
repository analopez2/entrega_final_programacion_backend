export default class ProductsService {
  constructor(dao) {
    this.dao = dao;
  }
  getProducts = () => {
    return this.dao.getAll();
  };
  saveProduct = (product) => {
    if (product.stock < 0) throw { status: 400, error: 'El stock no puede ser menor a 0' };
    return this.dao.save(product);
  };
  getProductById = async (id) => {
    let product = await this.dao.getById(id);
    if (!product) throw { status: 404, error: 'Producto no encontrado' };

    return product;
  };

  updateProductById = async (id, product) => {
    if (product.stock < 0) throw { status: 400, error: 'El stock no puede ser menor a 0' };
    const element = await this.dao.getById(id);
    if (!element) throw { status: 404, error: 'Producto no encontrado' };

    return this.dao.updateById(id, product);
  };
  deleteById = async (id) => {
    const product = await this.dao.getById(id);
    if (!product) throw { status: 404, error: 'Producto no encontrado' };

    return this.dao.deleteById(id);
  };
}
