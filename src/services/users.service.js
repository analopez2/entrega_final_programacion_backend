export default class UsersService {
  constructor(dao) {
    this.dao = dao;
  }
  getUsers = () => {
    return this.dao.getAll();
  };
  saveUser = (user) => {
    return this.dao.save(user);
  };
  updateById = async (id, user) => {
    const element = await this.dao.findById(id);

    if (!element) return { error: 'Elemento no encontrado' };
    return this.dao.updateById(id, user);
  };
  deleteById = (id) => {
    return this.dao.deleteById(id);
  };
}
