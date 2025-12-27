import { Model, DataTypes } from 'sequelize';
import { USER_TABLE } from './user.model.js';

const AUTH_TABLE = 'auth';

const AuthSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
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
    onDelete: 'CASCADE',
  },
};

class Auth extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'idUser',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: AUTH_TABLE,
      modelName: 'Auth',
      timestamps: false,
    };
  }
}

export { AUTH_TABLE, AuthSchema, Auth };
