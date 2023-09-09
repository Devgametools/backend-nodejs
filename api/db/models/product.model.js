const { Model, DataTypes } = require('sequelize');

const PRODUCT_TABLE = 'product';

const productSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  price: {
    allowNull: false,
    type: DataTypes.DOUBLE,
  },
  stock: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  category: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  images: {
    allowNull: true,
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
};

class Product extends Model {
  static associate() {
    //
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

module.exports = { PRODUCT_TABLE, productSchema, Product };
