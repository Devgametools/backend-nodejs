const { Product, productSchema } = require('./product.model');
const { User, userSchema } = require('./user.model');
const { Customer, customerSchema } = require('./customer.model');
const { Address, addressSchema } = require('./addresses.model');
const { Cart, cartSchema } = require('./cart.model');
const { Order, orderSchema } = require('./order.model');
const { OrderProduct, orderProductSchema } = require('./order-product.model');
const { Payment, paymentSchema } = require('./payment-record.model');

function setupModels(sequelize) {
  Product.init(productSchema, Product.config(sequelize));
  User.init(userSchema, User.config(sequelize));
  Order.init(orderSchema, Order.config(sequelize));
  Cart.init(cartSchema, Cart.config(sequelize));
  Address.init(addressSchema, Address.config(sequelize));

  Customer.init(customerSchema, Customer.config(sequelize));
  OrderProduct.init(orderProductSchema, OrderProduct.config(sequelize));
  Payment.init(paymentSchema, Payment.config(sequelize));

  Product.associate(sequelize.models);
  User.associate(sequelize.models);
  Address.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Order.associate(sequelize.models);
  Payment.associate(sequelize.models);
  Cart.associate(sequelize.models);
}

module.exports = setupModels;
