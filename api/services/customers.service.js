const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {

  constructor() {}

  async show () {
    const customers = await models.Customer.findAll({include: ['user']});
    if (!customers) {
      throw boom.badRequest('Error');
    } else {
      customers.map((customer) => {delete customer.user.dataValues.password, delete customer.user.dataValues.recoveryToken});
      return customers;
    }
  }

  async find(id) {
    const customer = await models.Customer.findByPk(id, {include: ['user']});
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    else {
      delete customer.user.dataValues.password;
      delete customer.user.dataValues.recoveryToken;
      return customer;
    }
  }

  async update(id, changes) {
    const customer = await this.find(id);
    const newInfo = await customer.update(changes);
    return {id, newInfo};
  }

  async delete(id) {
    const customer = await this.find(id);
    await customer.destroy();
    await customer.user.destroy();
    return id;
  }
}

module.exports = CustomerService;
