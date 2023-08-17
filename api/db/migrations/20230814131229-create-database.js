'use strict';
const { CATEGORY_TABLE, categorySchema } = require('../models/category.model');
const { CUSTOMER_TABLE, customerSchema } = require('../models/customer.model');
const { ORDER_PRODUCT_TABLE, orderProductSchema } = require('../models/order-product.model');
const { PRODUCT_TABLE, productSchema } = require('../models/product.model');
const { USER_TABLE, userSchema } = require('../models/user.model');
const { ORDER_TABLE, orderSchema } = require('../models/order.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CUSTOMER_TABLE, customerSchema);
    await queryInterface.createTable(CATEGORY_TABLE, categorySchema);
    await queryInterface.createTable(ORDER_TABLE, orderSchema);
    await queryInterface.createTable(PRODUCT_TABLE, productSchema);
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, orderProductSchema);
    await queryInterface.createTable(USER_TABLE, userSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
  }
};
