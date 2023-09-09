const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

const ADDRESS_TABLE = 'addresses';

const addressSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  customerId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'customer_id',
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  country: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  city: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  address: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  reference: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  modifiedAt: {
    allowNull: true,
    field: 'modified_at',
    type: DataTypes.DATE,
  },
};

class Address extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, { as: 'customer' });
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'shippingAddress',
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

module.exports = { ADDRESS_TABLE, addressSchema, Address };
