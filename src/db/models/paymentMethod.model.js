import { Model, DataTypes } from 'sequelize';

const PAYMENT_METHOD_TABLE = 'payment_methods';

const PaymentMethodSchema = {
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
  isActive: {
    field: 'is_active',
    allowNull: true,
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
};

class PaymentMethod extends Model {
  static associate(models) {
    this.hasMany(models.Payment, { as: 'payments', foreignKey: 'idMethod' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PAYMENT_METHOD_TABLE,
      modelName: 'PaymentMethod',
      timestamps: false,
    };
  }
}

export { PAYMENT_METHOD_TABLE, PaymentMethodSchema, PaymentMethod };
