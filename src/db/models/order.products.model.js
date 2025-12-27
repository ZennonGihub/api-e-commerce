import { Model, DataTypes, Sequelize } from 'sequelize';

const PRODUCT_TABLE = 'products';
const ORDER_TABLE = 'orders';

export const ORDER_PRODUCT_TABLE = 'orders_product';

export const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
};

export class OrderProduct extends Model {
  static associate(models) {
    this.belongsTo(models.Order, {
      as: 'order',
      foreignKey: 'orderId',
    });
    this.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'productId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      schema: 'public',
      timestamps: false,
    };
  }
}
