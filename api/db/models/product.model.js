const { Model, DataTypes } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model');
const { GENDER_TABLE } = require('./gender.model');
const { TARGET_TABLE } = require('./target.model');

const PRODUCT_TABLE = 'products';

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
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  targetId: {
    field: 'target_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: TARGET_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  genderId: {
    field: 'gender_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: GENDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  images: {
    allowNull: true,
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
};

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, { as: 'category' });
    this.belongsTo(models.Target, { as: 'target' });
    this.belongsTo(models.Gender, { as: 'gender' });
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
