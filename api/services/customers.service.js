const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {}

  async hideInfo(data) {
    delete data.user.dataValues.password;
    delete data.user.dataValues.recoveryToken;
  }

  async show() {
    const customers = await models.Customer.findAll({ include: ['user'] });
    if (!customers) {
      throw boom.badRequest('Error');
    } else {
      customers.map((customer) => this.hideInfo(customer));
      return customers;
    }
  }

  async find(id) {
    const customer = await models.Customer.findByPk(id, { include: ['user'] });
    if (!customer) {
      throw boom.notFound('Customer not found');
    } else {
      this.hideInfo(customer);
      return customer;
    }
  }

  async update(id, changes) {
    const customer = await this.find(id);
    await customer.update(changes);
    customer.set({ modifiedAt: Date.now() });
    await customer.save();
    return customer;
  }
}

module.exports = CustomerService;
