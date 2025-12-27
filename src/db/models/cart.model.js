import { Model, DataTypes, Sequelize } from 'sequelize';
import { USER_TABLE } from './user.model.js';

const CART_TABLE = 'cart';

const CartSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  idUser: {
    field: 'id_user',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  updatedAt: {
    field: 'updated_at',
    allowNull: true,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Cart extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user', foreignKey: 'idUser' });

    this.hasMany(models.CartItem, { as: 'items', foreignKey: 'idCart' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CART_TABLE,
      modelName: 'Cart',
      timestamps: true,
      createdAt: false,
      updatedAt: 'updated_at',
    };
  }
}

export { CART_TABLE, CartSchema, Cart };
