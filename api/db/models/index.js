const { Product, productSchema } = require('./product.model');
const { Category, categorySchema } = require('./category.model');
const { Target, targetSchema } = require('./target.model');
const { Gender, genderSchema } = require('./gender.model');
const { User, userSchema } = require('./user.model');
const { Customer, customerSchema } = require('./customer.model');
const { Address, addressSchema } = require('./addresses.model');
const { Cart, cartSchema } = require('./cart.model');
const { CartProduct, cartProductSchema } = require('./cart-product.model');
const { Order, orderSchema } = require('./order.model');
const { OrderProduct, orderProductSchema } = require('./order-product.model');
const { Payment, paymentSchema } = require('./payment-record.model');

function setupModels (sequelize) {
  Product.init(productSchema, Product.config(sequelize));
  User.init(userSchema, User.config(sequelize));
  Order.init(orderSchema, Order.config(sequelize));
  Cart.init(cartSchema, Cart.config(sequelize));
  Address.init(addressSchema, Address.config(sequelize));

  Category.init(categorySchema, Category.config(sequelize));
  Target.init(targetSchema, Target.config(sequelize));
  Gender.init(genderSchema, Gender.config(sequelize));
  Customer.init(customerSchema, Customer.config(sequelize));
  OrderProduct.init(orderProductSchema, OrderProduct.config(sequelize));
  Payment.init(paymentSchema, Payment.config(sequelize));
  CartProduct.init(cartProductSchema, CartProduct.config(sequelize));

  Product.associate(sequelize.models);
  Category.associate(sequelize.models);
  Target.associate(sequelize.models);
  Gender.associate(sequelize.models);
  User.associate(sequelize.models);
  Address.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Order.associate(sequelize.models);
  Payment.associate(sequelize.models);
  Cart.associate(sequelize.models);

}

module.exports = setupModels;
