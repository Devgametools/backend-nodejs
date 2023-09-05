const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class GenderService {
  constructor() {}

  async show() {
    const gender = await models.Gender.findAll();
    if (gender.length === 0) {
      throw boom.notFound('No gender found');
    } else {
      return gender;
    }
  }

  async find(id) {
    const gender = await models.Gender.findByPk(parseInt(id));
    if (!gender) {
      throw boom.notFound('Gender not found');
    } else {
      return gender;
    }
  }
}

module.exports = GenderService;
