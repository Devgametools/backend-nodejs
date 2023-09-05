const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CategoryService {
  constructor() {}

  async show() {
    const categories = await models.Category.findAll();
    if (categories.length === 0) {
      throw boom.notFound('No categories found');
    } else {
      return categories;
    }
  }

  async find(id) {
    const category = await models.Category.findByPk(parseInt(id));
    if (!category) {
      throw boom.notFound('Category not found');
    } else {
      return category;
    }
  }
}

module.exports = CategoryService;
