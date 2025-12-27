import { Model, DataTypes, Sequelize } from 'sequelize';
import { USER_TABLE } from './user.model.js';

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  firstName: {
    field: 'first_name',
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    field: 'last_name',
    allowNull: false,
    type: DataTypes.STRING,
  },
  idUser: {
    field: 'id_user',
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW,
  },
};

class Customer extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user', foreignKey: 'idUser' });

    this.hasMany(models.Address, { as: 'addresses', foreignKey: 'idCustomer' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: true,
    };
  }
}

export { CUSTOMER_TABLE, CustomerSchema, Customer };
