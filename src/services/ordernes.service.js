import boom from '@hapi/boom';
import { models } from '../libs/sequelize.js';
import { CartUsers } from './carroDeCompras.service.js';

const service = new CartUsers();

export class OrderService {
  constructor() {}

  async create(idUser, idCart) {
    const user = await models.User.findByPk(idUser, {
      include: [
        {
          association: 'customer',
          attributes: ['id'],
          include: [
            {
              association: 'addresses',
              attributes: ['id'],
            },
          ],
        },
      ],
    });
    if (!user) {
      throw boom.notFound('Perfil no encontrado');
    }
    const itemsCart = await service.getOneCart(idCart);

    const newOrder = await models.Order.create({
      id_customer: user.customers.id,
      id_status: 1,
      id_address: user.customer.addresses.id,
      totalPrice: totalPrice,
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
