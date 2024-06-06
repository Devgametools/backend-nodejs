const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class AddressService {
  constructor() {}

  async create(data, id) {
    const address = await models.Address.create({ ...data, customerId: id });
    return {
      message: 'Direccion creada satisfactoriamente',
      address,
    };
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

  async find(id, cid) {
    const address = await models.Address.findOne({
      where: {
        id: id,
        customerId: cid,
      },
      include: [
        {
          association: 'customer',
        },
      ],
    });
    if (!address) {
      return { message: 'Direccion no existe' };
    } else {
      return address;
    }
  }

  async update(id, cid, changes) {
    const address = await this.find(id, cid);
    if (address.id) {
      await address.update(changes);
      address.set({ modifiedAt: Date.now() });
      await address.save();
      return {
        message: 'Direccion actualizada correctamente',
        address,
      };
    } else {
      return {
        message: 'Direccion no existe',
      };
    }
  }

  async delete(id, cid) {
    const address = await this.find(id, cid);
    if (address.id) {
      address.destroy();
      return {
        id: id,
        message: 'Direccion eliminada correctamente',
      };
    } else {
      return {
        message: 'Direccion no existe',
      };
    }
  }
}

module.exports = AddressService;
