const { Model, DataTypes } = require('sequelize');

const GENDER_TABLE = 'gender';

const genderSchema = {
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

class Gender extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'genderId'
    });
  }

    static config(sequelize) {
      return {
        sequelize,
        tableName: GENDER_TABLE,
        modelName: 'Gender',
        timestamps: false
      }
    }
}

module.exports = { Gender, genderSchema, GENDER_TABLE };
