export default class ProductsService {
  constructor(dao) {
    this.dao = dao;
  }
  getProducts = () => {
    return this.dao.getAll();
  };
  saveProduct = (product) => {
    return this.dao.save(product);
  };
  getProductById = (id) => {
    let product = this.dao.getById(id);
    if (!product) throw { error: 'Producto no encontrado' };

    return product;
  };
  updateProductById = (id, product) => {
    const element = this.dao.findById(id);

    if (!element) return { error: 'Producto no encontrado' };
    return this.dao.updateById(id, product);
  };
  deleteById = (id) => {
    const product = this.dao.getById(id);
    if (!product) throw { error: 'Producto no encontrado' };

    return this.dao.deleteById(id);
  };
}
