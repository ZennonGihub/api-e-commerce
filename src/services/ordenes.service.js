import boom from '@hapi/boom';
import { models } from '../libs/sequelize.js';
import { sequelize } from '../libs/sequelize.js';

export class OrderService {
  constructor() {}

  async create(userId, idAddress) {
    const transaction = await sequelize.transaction();

    try {
      const user = await models.User.findByPk(userId, {
        include: ['customer'],
      });

      if (!user || !user.customer) {
        throw boom.badRequest('Debes tener un perfil de cliente para comprar');
      }

      const cart = await models.Cart.findOne({
        where: { idUser: userId },
        include: [
          {
            association: 'items',
            include: [{ association: 'product' }],
          },
        ],
      });

      if (!cart || !cart.items.length) {
        throw boom.badRequest('El carrito está vacío');
      }

      let total = 0;
      for (const item of cart.items) {
        if (item.product.stock < item.quantity) {
          throw boom.conflict(`Stock insuficiente para: ${item.product.name}`);
        }
        total += item.product.price * item.quantity;
      }

      const newOrder = await models.Order.create(
        {
          idCustomer: user.customer.id,
          idAddress: idAddress,
          idStatus: 1,
          totalPrice: total,
        },
        { transaction: transaction },
      );

      for (const item of cart.items) {
        await models.OrderItem.create(
          {
            idOrder: newOrder.id,
            idProduct: item.product.id,
            quantity: item.quantity,
            unitPrice: item.product.price,
          },
          { transaction: transaction },
        );

        await models.Product.update(
          { stock: item.product.stock - item.quantity },
          { where: { id: item.product.id }, transaction: transaction },
        );
      }

      await models.CartItem.destroy({
        where: { idCart: cart.id },
        transaction: transaction,
      });

      await transaction.commit();
      return newOrder;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async find() {
    const orders = await models.Order.findAll({
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
      ],
    });
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });

    if (!order) {
      throw boom.notFound('Orden no encontrada');
    }
    return order;
  }

  async findByUser(userId) {
    const customer = await models.Customer.findOne({
      where: { idUser: userId },
    });

    if (!customer) return [];
    const orders = await models.Order.findAll({
      where: {
        idCustomer: customer.id,
      },
      include: ['items'],
    });
    return orders;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    const rta = await order.update(changes);
    return rta;
  }

  async updateStatus(idOrder, newStatusId, notes) {
    const transaction = await sequelize.transaction();

    try {
      const order = await models.Order.findByPk(idOrder);
      if (!order) throw boom.notFound('Orden no encontrada');

      await order.update(
        { idStatus: newStatusId },
        { transaction: transaction },
      );

      await models.OrderTracking.create(
        {
          idOrder: order.id,
          idStatus: newStatusId,
          notes: notes || 'Actualización de estado',
        },
        { transaction: transaction },
      );

      await transaction.commit();
      return order;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id };
  }
}
