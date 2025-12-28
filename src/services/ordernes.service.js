import boom from '@hapi/boom';
import { models } from '../libs/sequelize.js';

export class OrderService {
  constructor() {}

  async create(idUser, data) {
    const customer = await models.Customer.findByPk(data.idCustomer);
    if (!customer) {
      throw boom.notFound('Perfil no encontrado');
    }
    const newOrder = await models.Order.create({
      id_user: idUser,
      id_customer: data.idCustomer,
      idAddress: data.idAddress,
      idStatus: 1,
      totalPrice: 0,
    });

    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderItem.create(data);
    return newItem;
  }

  async find() {
    const orders = await models.Order.findAll({
      include: ['user'],
    });
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'user',
          include: ['customer'],
        },
        'items',
      ],
    });

    if (!order) {
      throw boom.notFound('Orden no encontrada');
    }
    return order;
  }

  async findUserAllOrders(userId) {
    const orders = await models.Order.findAll({
      where: {
        idUser: userId,
      },
      include: ['items', 'status'],
    });
    return orders;
  }

  async update(id, changes) {
    const order = await this.findOne(id);

    if (!changes) {
      throw boom.badRequest('No se proporcionó información');
    }

    const rta = await order.update(changes);
    return rta;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id };
  }
}
