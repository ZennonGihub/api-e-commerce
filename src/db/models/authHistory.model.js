import { Model, DataTypes } from 'sequelize';
import { AUTH_TABLE } from './auth.model.js';

const AUTH_HISTORY_TABLE = 'auth_history';

const AuthHistorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  idAuth: {
    field: 'id_auth',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: AUTH_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  oldPassword: {
    field: 'old_password',
    allowNull: true,
    type: DataTypes.STRING,
  },
  oldPhone: {
    field: 'old_phone',
    allowNull: true,
    type: DataTypes.STRING,
  },
  oldEmail: {
    field: 'old_email',
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    field: 'changed_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

class AuthHistory extends Model {
  static associate(models) {
    this.belongsTo(models.Auth, {
      as: 'auth',
      foreignKey: 'idAuth',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: AUTH_HISTORY_TABLE,
      modelName: 'AuthHistory',
      timestamps: true,
      createdAt: 'changed_at',
      updatedAt: false,
    };
  }
}

export { AUTH_HISTORY_TABLE, AuthHistorySchema, AuthHistory };
