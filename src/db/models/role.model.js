import { Model, DataTypes } from 'sequelize';

const ROLE_TABLE = 'role';

const RoleSchema = {
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

class Role extends Model {
  static associate(models) {
    this.hasMany(models.User, {
      as: 'users',
      foreignKey: 'idRole',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROLE_TABLE,
      modelName: 'Role',
      timestamps: false,
    };
  }
}

export { ROLE_TABLE, RoleSchema, Role };
