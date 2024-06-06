const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}

  async create(data, cid) {
    data.customerId = cid;
    const newOrder = await models.Order.create(data);
    if (!newOrder) {
      throw boom.badRequest('Error');
    } else {
      return {
        message: 'Orden Creada correctamente',
        newOrder,
      };
    }
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    if (!newItem) {
      throw boom.badRequest('Error');
    } else {
      return newItem;
    }
  }

  async show() {
    const orders = await models.Order.findAll({ include: ['customer'] });
    if (!orders) {
      throw boom.notFound('No information response');
    } else {
      return orders;
    }
  }

  async find(id) {
    const order = await models.Order.findByPk(id, {
      include: [{ association: 'customer', include: ['user'] }, 'items'],
    });
    if (!order) {
      throw boom.notFound('Order not found');
    } else {
      return order;
    }
  }

  async findByUser(customerId) {
    const orders = await models.Order.findAll({
      where: {
        customerId: customerId,
      },
      include: [
        {
          association: 'customer',
        },
      ],
    });
    return orders;
  }

  async update(id, changes) {
    const order = await this.find(id);
    const newOrder = await order.update(changes);
    return newOrder;
  }

  async delete(id) {
    const order = await this.find(id);
    await order.destroy();
    return id;
  }
}

module.exports = OrderService;
