const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CategoryService {

  constructor(){
  }
  async create(data) {
    const newCategory = await models.Category.create(data);
    if (!newCategory) {
      throw boom.badData('No data found to create new Category');
    } else {
      return newCategory;
    }
  }

  async show() {
    const categories = await models.Category.findAll({include: ['products']});
    if (!categories) {
      throw boom.notFound('No products found');
    } else {
      return categories;
    }
  }

  async find(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = CategoryService;
