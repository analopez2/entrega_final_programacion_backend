import { transporter } from '../clients/NodeMailer.js';
import mailRegistro from '../helpers/mail.registro.js';

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
    await transporter.sendMail({
      from: 'Registro de Usuario',
      to: user.email,
      subject: 'Usuario Registrado',
      html: mailRegistro.registerMessage(user.first_name),
    });
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
