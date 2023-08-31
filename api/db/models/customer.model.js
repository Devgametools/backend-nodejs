const { Model, DataTypes } = require('sequelize');

const CUSTOMER_TABLE = 'customers';

const customerSchema = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    field: 'last_name',
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
};

class Customer extends Model {
  static associate(models) {
    this.hasOne(models.User, { as: 'user', foreignKey: 'customerId' });
    this.hasOne(models.Cart, { as: 'cart', foreignKey: 'customerId' });
    this.hasMany(models.Order, { as: 'orders', foreignKey: 'customerId' });
    this.hasMany(models.Address, { as: 'addresses', foreignKey: 'customerId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
    };
  }
}

module.exports = { CUSTOMER_TABLE, customerSchema, Customer };
