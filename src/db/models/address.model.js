import { Model, DataTypes } from 'sequelize';
import { CITY_TABLE } from './city.model.js';
import { CUSTOMER_TABLE } from './customers.model.js';

const ADDRESS_TABLE = 'address';

const AddressSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  street: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  number: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  idCity: {
    field: 'id_city',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: CITY_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  idCustomer: {
    field: 'id_customer',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
};

class Address extends Model {
  static associate(models) {
    this.belongsTo(models.City, {
      as: 'city',
      foreignKey: 'idCity',
    });

    this.belongsTo(models.Customer, {
      as: 'customer',
      foreignKey: 'idCustomer',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ADDRESS_TABLE,
      modelName: 'Address',
      timestamps: false,
    };
  }
}

export { ADDRESS_TABLE, AddressSchema, Address };
