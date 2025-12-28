import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import { models } from '../libs/sequelize.js';
import { sequelize } from '../libs/sequelize.js';

export class CustomerService {
  constructor() {}

  async create(data) {
    const t = await sequelize.transaction();

    try {
      const newUser = await models.User.create(
        {
          username: data.username,
          idRole: 2,
        },
        { transaction: t },
      );

      const hash = await bcrypt.hash(data.password, 10);

      await models.Auth.create(
        {
          idUser: newUser.id,
          email: data.email,
          password: hash,
          phone: data.phone,
        },
        { transaction: t },
      );

      const newCustomer = await models.Customer.create(
        {
          idUser: newUser.id,
          firstName: data.firstName,
          lastName: data.lastName,
        },
        { transaction: t },
      );

      await t.commit();

      return newCustomer;
    } catch (error) {
      await t.rollback();

      if (error.name === 'SequelizeUniqueConstraintError') {
        throw boom.conflict('El usuario o email ya existe');
      }
      throw boom.badRequest(error);
    }
  }

  async findAll() {
    const customers = await models.Customer.findAll({
      include: [
        {
          model: models.User,
          as: 'user',
          include: [
            {
              model: models.Auth,
              as: 'auth',
              attributes: ['email'],
            },
          ],
        },
      ],
    });
    return customers;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id, {
      include: [
        {
          model: models.User,
          as: 'user',
          include: [
            {
              model: models.Auth,
              as: 'auth',
              attributes: ['email', 'phone'],
            },
          ],
        },
      ],
    });

    if (!customer) {
      throw boom.notFound('Customer no encontrado');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}
