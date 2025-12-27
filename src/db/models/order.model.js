import { Model, DataTypes, Sequelize } from 'sequelize';
import { USER_TABLE } from './user.model.js';
import { ORDER_STATUS_TABLE } from './orderStatus.model.js';
import { ADDRESS_TABLE } from './address.model.js';

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  totalPrice: {
    field: 'total_price',
    allowNull: false,
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
    onDelete: 'RESTRICT',
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
  idAddress: {
    field: 'id_address',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ADDRESS_TABLE,
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

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user', foreignKey: 'idUser' });
    this.belongsTo(models.OrderStatus, {
      as: 'status',
      foreignKey: 'idStatus',
    });
    this.belongsTo(models.Address, { as: 'address', foreignKey: 'idAddress' });

    this.hasMany(models.OrderItem, { as: 'items', foreignKey: 'idOrder' });

    this.hasMany(models.OrderTracking, {
      as: 'tracking',
      foreignKey: 'idOrder',
    });

    this.hasMany(models.Payment, { as: 'payments', foreignKey: 'idOrder' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at',
    };
  }
}

export { ORDER_TABLE, OrderSchema, Order };
