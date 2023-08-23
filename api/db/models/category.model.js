const { Model, DataTypes } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const categorySchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}

class Category extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'categoryId'
    });
  }

    static config(sequelize) {
      return {
        sequelize,
        tableName: CATEGORY_TABLE,
        modelName: 'Category',
        timestamps: false
      }
    }
}

module.exports = { Category, categorySchema, CATEGORY_TABLE };
