const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class AddressService {
  constructor() {}

  async create(data, id) {
    const address = await models.Address.create({ ...data, customerId: id });
    return address;
  }

  async show(id) {
    const addresses = await models.Address.findAll({
      where: { customerId: id },
      include: [
        {
          association: 'customer',
        },
      ],
    });
    if (!addresses) {
      throw boom.badRequest('Error');
    } else {
      return addresses;
    }
  }

  async find(id) {
    const address = await models.Address.findByPk(id, {
      include: ['customer'],
    });
    if (!address) {
      throw boom.notFound('Address not found');
    } else {
      return address;
    }
  }

  async update(id, changes) {
    const customer = await this.find(id);
    await customer.update(changes);
    customer.set({ modifiedAt: Date.now() });
    await customer.save();
    return customer;
  }

  async delete(id) {
    const address = await this.find(id);
    address.destroy();
    return id;
  }
}

module.exports = AddressService;
