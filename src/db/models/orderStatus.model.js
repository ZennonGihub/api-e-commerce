import { Model, DataTypes } from 'sequelize';

const ORDER_STATUS_TABLE = 'order_status';

const OrderStatusSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

class OrderStatus extends Model {
  static associate(models) {
    this.hasMany(models.Order, { as: 'orders', foreignKey: 'idStatus' });

    this.hasMany(models.OrderTracking, {
      as: 'trackingRecords',
      foreignKey: 'idStatus',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_STATUS_TABLE,
      modelName: 'OrderStatus',
      timestamps: false,
    };
  }
}

export { ORDER_STATUS_TABLE, OrderStatusSchema, OrderStatus };
