import { Model, DataTypes } from 'sequelize';
import { ORDER_TABLE } from './order.model.js';
import { PRODUCT_TABLE } from './products.model.js';

const ORDER_ITEM_TABLE = 'order_items';

const OrderItemSchema = {
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
  idProduct: {
    field: 'id_product',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  unitPrice: {
    field: 'unit_price',
    allowNull: false,
    type: DataTypes.INTEGER,
  },
};

class OrderItem extends Model {
  static associate(models) {
    this.belongsTo(models.Order, { as: 'order', foreignKey: 'idOrder' });
    this.belongsTo(models.Product, { as: 'product', foreignKey: 'idProduct' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_ITEM_TABLE,
      modelName: 'OrderItem',
      timestamps: false,
    };
  }
}

export { ORDER_ITEM_TABLE, OrderItemSchema, OrderItem };
