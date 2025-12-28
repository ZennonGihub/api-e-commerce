import boom from '@hapi/boom';
import { models } from '../libs/sequelize.js';

export class UserService {
  constructor() {}

  // Metodo para crear usuarios directos.
  async create(data) {
    const newUser = await models.User.create({
      username: data.username,
      idRole: data.idRole || 2,
    });
    return newUser;
  }

  async find() {
    const users = await models.User.findAll({
      include: [
        'customer',
        {
          association: 'auth',
          attributes: ['email', 'phone'],
        },
      ],
    });
    return users;
  }

  async findOne(id) {
    if (!id) throw boom.badRequest('El ID es requerido');

    const user = await models.User.findByPk(id, {
      include: [
        'customer',
        'role',
        {
          association: 'auth',
          attributes: ['email'],
        },
      ],
    });

    if (!user) {
      throw boom.notFound('Usuario no encontrado');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}
