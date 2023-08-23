const { Model, DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } =  require('./customer.model');

const CART_TABLE = 'cart';

const cartSchema = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

  class Cart extends Model {
    static associate (models) {
      this.belongsTo(models.Customer, {
        as: 'customer'
      });
      this.belongsToMany(models.Product, {
        as: 'items',
        through: models.CartProduct,
        foreignKey: 'cartId',
        otherKey: 'productId'
      });
    }

    static config (sequelize) {
      return {
        sequelize,
        tableName: CART_TABLE,
        modelName: 'Cart',
        timestamps: false
      }
    }
  }

  module.exports = { CART_TABLE, cartSchema, Cart };
