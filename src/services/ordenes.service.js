import boom from '@hapi/boom';
import { models } from '../libs/sequelize.js';

export class OrderService {
  constructor() {}

  async create(userId, idAddress) {
    // Iniciamos nuestra transaccion
    const transaction = await sequelize.transaction();

    try {
      // Validamos al usuario
      const user = await models.User.findByPk(userId, {
        include: ['customer'],
      });

      if (!user || !user.customer) {
        throw boom.badRequest('Debes tener un perfil de cliente para comprar');
      }

      // B. Obtener Carrito con Productos
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

      // C. CALCULAR TOTAL Y VALIDAR STOCK
      let total = 0;

      for (const item of cart.items) {
        // Validación de Stock antes de procesar
        if (item.product.stock < item.quantity) {
          throw boom.conflict(`Stock insuficiente para: ${item.product.name}`);
        }
        total += item.product.price * item.quantity;
      }

      // Creamos la orden
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
        // Creamos el OrderItem
        await models.OrderItem.create(
          {
            idOrder: newOrder.id,
            idProduct: item.product.id,
            quantity: item.quantity,
            unitPrice: item.product.price, // Guardamos el precio histórico
          },
          { transaction: transaction },
        );

        // Descontamos el stock del/los producto/s
        await models.Product.update(
          { stock: item.product.stock - item.quantity },
          { where: { id: item.product.id }, transaction: transaction },
        );
      }

      // Limpiamos el carrito
      await models.CartItem.destroy({
        where: { idCart: cart.id },
        transaction: transaction,
      });

      // Confirmamos
      await transaction.commit();

      return newOrder;
    } catch (error) {
      // Por si algo falla, vuelta atras
      await transaction.rollback();
      throw error;
    }
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
