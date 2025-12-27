import { Model, DataTypes, Sequelize } from 'sequelize';
import { ORDER_TABLE } from './order.model.js';
import { PAYMENT_METHOD_TABLE } from './paymentMethod.model.js';

const PAYMENT_TABLE = 'payments';

const PaymentSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  transactionId: {
    field: 'transaction_id',
    allowNull: true,
    type: DataTypes.STRING,
  },
  status: {
    allowNull: true,
    type: DataTypes.STRING,
    defaultValue: 'completed',
  },
  idOrder: {
    field: 'id_order',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  },
  idMethod: {
    field: 'id_method',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PAYMENT_METHOD_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  },
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Payment extends Model {
  static associate(models) {
    this.belongsTo(models.Order, { as: 'order', foreignKey: 'idOrder' });
    this.belongsTo(models.PaymentMethod, {
      as: 'method',
      foreignKey: 'idMethod',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PAYMENT_TABLE,
      modelName: 'Payment',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at',
    };
  }
}

export { PAYMENT_TABLE, PaymentSchema, Payment };
