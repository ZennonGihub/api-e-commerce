import { Model, DataTypes } from 'sequelize';

const REGION_TABLE = 'region';

const RegionSchema = {
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

class Region extends Model {
  static associate(models) {
    this.hasMany(models.City, { as: 'cities', foreignKey: 'idRegion' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: REGION_TABLE,
      modelName: 'Region',
      timestamps: false,
    };
  }
}

export { REGION_TABLE, RegionSchema, Region };
