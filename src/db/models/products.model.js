import { Model, DataTypes } from 'sequelize';
import { CATEGORY_TABLE } from './category.model.js';
import { PRODUCT_STATUS_TABLE } from './productStatus.model.js';

const PRODUCT_TABLE = 'products';

const ProductSchema = {
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
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  stock: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  imageUrl: {
    field: 'image_url',
    allowNull: true,
    type: DataTypes.STRING,
  },
  idCategory: {
    field: 'id_category',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
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
      model: PRODUCT_STATUS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  },
};

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'idCategory',
    });
    this.belongsTo(models.ProductStatus, {
      as: 'status',
      foreignKey: 'idStatus',
    });

    this.hasMany(models.CartItem, { as: 'inCarts', foreignKey: 'idProduct' });
    this.hasMany(models.OrderItem, { as: 'inOrders', foreignKey: 'idProduct' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false,
    };
  }
}

export { PRODUCT_TABLE, ProductSchema, Product };
