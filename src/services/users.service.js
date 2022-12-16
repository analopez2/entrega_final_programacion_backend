export default class UsersService {
  constructor(dao) {
    this.dao = dao;
  }
  getUsers = () => {
    return this.dao.getAll();
  };
  getUserByEmail = (email) => {
    return this.dao.getByEntity({ email: email });
  };
  getUserById = (id) => {
    return this.dao.getByEntity({ _id: id });
  };
  create = async (user) => {
    return this.dao.save(user);
  };
  updateById = async (id, user) => {
    const element = await this.dao.getUserById(id);

    if (!element) throw { status: 404, error: 'Usuario no encontrado' };

    return this.dao.updateById(id, user);
  };
  deleteById = (id) => {
    return this.dao.deleteById(id);
  };
}
