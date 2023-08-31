'use strict';
const { DataTypes, Sequelize } = require('sequelize');

const { ADMIN_TABLE, adminSchema } = require('../models/admins.model');
const { CATEGORY_TABLE, categorySchema } = require('../models/category.model');
const { CUSTOMER_TABLE, customerSchema } = require('../models/customer.model');
const {
  ORDER_PRODUCT_TABLE,
  orderProductSchema,
} = require('../models/order-product.model');
const { PRODUCT_TABLE, productSchema } = require('../models/product.model');
const { USER_TABLE, userSchema } = require('../models/user.model');
const { ORDER_TABLE } = require('../models/order.model');
const { ADDRESS_TABLE, addressSchema } = require('../models/addresses.model');
const { TARGET_TABLE, targetSchema } = require('../models/target.model');
const { GENDER_TABLE, genderSchema } = require('../models/gender.model');
const { CART_TABLE, cartSchema } = require('../models/cart.model');
const {
  CART_PRODUCT_TABLE,
  cartProductSchema,
} = require('../models/cart-product.model');
const {
  PAYMENT_TABLE,
  paymentSchema,
} = require('../models/payment-record.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ADMIN_TABLE, adminSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, customerSchema);
    await queryInterface.createTable(ADDRESS_TABLE, addressSchema);
    await queryInterface.createTable(CATEGORY_TABLE, categorySchema);
    await queryInterface.createTable(TARGET_TABLE, targetSchema);
    await queryInterface.createTable(GENDER_TABLE, genderSchema);
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
      customerId: {
        field: 'customer_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: CUSTOMER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      shippingAddress: {
        field: 'shipping_address',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: ADDRESS_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      orderStatus: {
        field: 'order_status',
        allowNull: false,
        type: DataTypes.STRING,
      },
      paymentStatus: {
        field: 'payment_status',
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      modifiedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'modified_at',
      },
    });
    await queryInterface.createTable(CART_TABLE, cartSchema);
    await queryInterface.createTable(PRODUCT_TABLE, productSchema);
    await queryInterface.createTable(PAYMENT_TABLE, paymentSchema);
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, orderProductSchema);
    await queryInterface.createTable(CART_PRODUCT_TABLE, cartProductSchema);
    await queryInterface.createTable(USER_TABLE, userSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ADMIN_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CART_PRODUCT_TABLE);
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
    await queryInterface.dropTable(PAYMENT_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CART_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(GENDER_TABLE);
    await queryInterface.dropTable(TARGET_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(ADDRESS_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};
