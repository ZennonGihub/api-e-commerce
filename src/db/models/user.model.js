import { Model, DataTypes, Sequelize } from 'sequelize';
import { ROLE_TABLE } from './role.model.js';

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  idRole: {
    field: 'id_role', // Nombre real en la DB
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: ROLE_TABLE,
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
};

class User extends Model {
  static associate(models) {
    this.belongsTo(models.Role, { as: 'role', foreignKey: 'idRole' });

    this.hasOne(models.Customer, { as: 'customer', foreignKey: 'idUser' });
    this.hasOne(models.Auth, { as: 'auth', foreignKey: 'idUser' });
    this.hasOne(models.Cart, { as: 'cart', foreignKey: 'idUser' });
    this.hasMany(models.Order, { as: 'orders', foreignKey: 'idUser' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: true,
      updatedAt: false,
    };
  }
}

export { USER_TABLE, UserSchema, User };
