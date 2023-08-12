const { Product, productSchema} = require('./product.model');
const { Category, categorySchema} = require('./category.model');
const { User, userSchema } = require('./user.model');
const { Customer, customerSchema } = require('./customer.model');

function setupModels (sequelize) {
  Product.init(productSchema, Product.config(sequelize));
  Category.init(categorySchema, Category.config(sequelize));
  User.init(userSchema, User.config(sequelize));
  Customer.init(customerSchema, Customer.config(sequelize));

  Product.associate(sequelize.models);
  Category.associate(sequelize.models);
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
}

module.exports = setupModels;
