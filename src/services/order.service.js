import boom from '@hapi/boom';
import { models } from './../libs/sequelize.js';

export class OrderService {
  constructor() {}

  async create(data) {
    const customer = await models.Customer.findOne({
      where: { userId: data },
    });
    console.log(customer);
    if (!customer) {
      throw boom.badRequest('Usuario no encontrado');
    }
    const newOrder = await models.Order.create({
      customerId: customer.id,
    });
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    const list = await models.Order.findAll();
    if (!list) {
      return [];
    }
    return list;
  }

  async findByUser(userId) {
    const customer = await models.Customer.findOne({
      where: { userId: userId },
    });
    if (!customer) {
      return [];
    }
    const orders = await models.Order.findAll({
      where: {
        customerId: customer.id,
      },
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    return orders;
  }

  async update(id, changes) {
    const order = this.findOne(id);
    if (!changes) {
      throw boom.notData('No se proporciono la informacion suficiente');
    }
    const newOrder = await order.update(changes);
    return newOrder;
  }

  async delete(id) {
    const orderRemoved = this.findOne(id);
    orderRemoved.destroy();
    return id;
  }
}
