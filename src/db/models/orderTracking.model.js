import { Model, DataTypes, Sequelize } from 'sequelize';
import { ORDER_TABLE } from './order.model.js';
import { ORDER_STATUS_TABLE } from './orderStatus.model.js';

const ORDER_TRACKING_TABLE = 'order_tracking';

const OrderTrackingSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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
    onDelete: 'CASCADE',
  },
  idStatus: {
    field: 'id_status',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_STATUS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  },
  notes: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  createdAt: {
    field: 'changed_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class OrderTracking extends Model {
  static associate(models) {
    this.belongsTo(models.Order, { as: 'order', foreignKey: 'idOrder' });
    this.belongsTo(models.OrderStatus, {
      as: 'status',
      foreignKey: 'idStatus',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TRACKING_TABLE,
      modelName: 'OrderTracking',
      timestamps: true,
      updatedAt: false,
      createdAt: 'changed_at',
    };
  }
}

export { ORDER_TRACKING_TABLE, OrderTrackingSchema, OrderTracking };
