import { Model, DataTypes } from 'sequelize';
import { REGION_TABLE } from './region.model.js';

const CITY_TABLE = 'city';

const CitySchema = {
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
  idRegion: {
    field: 'id_region',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: REGION_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class City extends Model {
  static associate(models) {
    this.belongsTo(models.Region, { as: 'region', foreignKey: 'idRegion' });

    this.hasMany(models.Address, { as: 'addresses', foreignKey: 'idCity' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CITY_TABLE,
      modelName: 'City',
      timestamps: false,
    };
  }
}

export { CITY_TABLE, CitySchema, City };
