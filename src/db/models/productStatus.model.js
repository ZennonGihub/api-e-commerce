import { Model, DataTypes } from 'sequelize';

const PRODUCT_STATUS_TABLE = 'product_status';

const ProductStatusSchema = {
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

class ProductStatus extends Model {
  static associate(models) {
    this.hasMany(models.Product, { as: 'products', foreignKey: 'idStatus' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_STATUS_TABLE,
      modelName: 'ProductStatus',
      timestamps: false,
    };
  }
}

export { PRODUCT_STATUS_TABLE, ProductStatusSchema, ProductStatus };
