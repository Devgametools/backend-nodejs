const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CategoryService {

  constructor(){}

  async create(data) {
    const newCategory = await models.Category.create(data);
    if (!newCategory) {
      throw boom.badData('No data found to create new Category');
    } else {
      return newCategory;
    }
  }

  async show() {
    const categories = await models.Category.findAll();
    if (!categories) {
      throw boom.notFound('No products found');
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

  async update(id, changes) {
    const category = await this.find(parseInt(id));
    const newCategory = await category.update(changes);
    return newCategory
  }

  async delete(id) {
    const category = await this.find(parseInt(id));
    await category.destroy();
    return id;
  }

}

module.exports = CategoryService;
