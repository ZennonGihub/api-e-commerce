import { Model, DataTypes } from 'sequelize';
import { CART_TABLE } from './cart.model.js';
import { PRODUCT_TABLE } from './products.model.js';

const CART_ITEM_TABLE = 'cart_items';

const CartItemSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  idCart: {
    field: 'id_cart',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CART_TABLE,
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
};

class CartItem extends Model {
  static associate(models) {
    // Pertenece a un Carrito
    this.belongsTo(models.Cart, {
      as: 'cart',
      foreignKey: 'idCart',
    });
    this.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'idProduct',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CART_ITEM_TABLE,
      modelName: 'CartItem',
      timestamps: false,
    };
  }
}

export { CART_ITEM_TABLE, CartItemSchema, CartItem };
