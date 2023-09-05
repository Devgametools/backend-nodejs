const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class TargetService {
  constructor() {}

  async show() {
    const target = await models.Target.findAll();
    if (target.length === 0) {
      throw boom.notFound('No target found');
    } else {
      return target;
    }
  }

  async find(id) {
    const target = await models.Target.findByPk(parseInt(id));
    if (!target) {
      throw boom.notFound('Target not found');
    } else {
      return target;
    }
  }
}

module.exports = TargetService;
