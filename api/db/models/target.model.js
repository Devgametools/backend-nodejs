const { Model, DataTypes } = require('sequelize');

const TARGET_TABLE = 'target';

const targetSchema = {
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

class Target extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'targetId'
    });
  }

    static config(sequelize) {
      return {
        sequelize,
        tableName: TARGET_TABLE,
        modelName: 'Target',
        timestamps: false
      }
    }
}

module.exports = { Target, targetSchema, TARGET_TABLE };
