const { Model, DataTypes } = require('sequelize');
const { CART_TABLE } = require('./cart.model');
const { PRODUCT_TABLE } = require('./product.model');

const CART_PRODUCT_TABLE = 'cart_products';

const cartProductSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true
  },
  cartId: {
    field: 'cart_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CART_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER
  }
}

class CartProduct extends Model {
  static associate () {
    //
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: CART_PRODUCT_TABLE,
      modelName: 'CartProduct',
      timestamps: false
    }
  }
}

module.exports = { CART_PRODUCT_TABLE, cartProductSchema, CartProduct };
