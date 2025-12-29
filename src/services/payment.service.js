import boom from '@hapi/boom';
import { models, sequelize } from '../libs/sequelize.js';

export class PaymentService {
  // Listar todos los metodos de pago
  async getPaymentMethods() {
    return await models.PaymentMethod.findAll({
      where: { isActive: true },
    });
  }

  // Procesamiento de un pago
  async create(data) {
    const transaction = await sequelize.transaction();

    try {
      const order = await models.Order.findByPk(data.idOrder, {
        transaction: transaction,
      });

      if (!order) throw boom.notFound('Orden no encontrada');

      if (order.totalPrice !== data.amount) {
        throw boom.badRequest(
          'El monto del pago no coincide con el total de la orden',
        );
      }

      const newPayment = await models.Payment.create(
        {
          idOrder: data.idOrder,
          idMethod: data.idMethod,
          amount: data.amount,
          transactionId: data.transactionId || 'MANUAL-' + Date.now(),
          status: 'completed',
        },
        { transaction: transaction },
      );

      await order.update({ idStatus: 2 }, { transaction: transaction });

      await models.OrderTracking.create(
        {
          idOrder: order.id,
          idStatus: 2,
          notes: 'Pago recibido exitosamente',
        },
        { transaction: transaction },
      );

      await transaction.commit();
      return newPayment;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
