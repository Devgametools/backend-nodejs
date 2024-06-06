const { Model, DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

const WALLET_TABLE = 'wallet';

const walletSchema = {
  customerId: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  cash: {
    allowNull: false,
    type: DataTypes.DOUBLE,
    defaultValue: 0,
  },
};

class Wallet extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, { as: 'customer' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: WALLET_TABLE,
      modelName: 'Wallet',
      timestamps: false,
    };
  }
}

module.exports = { Wallet, WALLET_TABLE, walletSchema };
