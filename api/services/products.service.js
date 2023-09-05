const { Op } = require('sequelize');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ProductsService {
  constructor() {}

  async show(query) {
    const options = {
      include: ['category', 'gender', 'target'],
      where: {},
    };
    const { limit, offset, price_min, price_max } = query;
    if (limit > 0 && offset) {
      options.limit = limit;
      options.offset = offset;
    } else if (price_min > 0 && price_max == 0) {
      options.where.price = {
        [Op.gte]: price_min,
      };
    } else if (price_min == 0 && price_max > 0) {
      options.where.price = {
        [Op.lte]: price_max,
      };
    } else if (price_min > 0 && price_max > 0) {
      options.where.price = {
        [Op.between]: [price_min, price_max],
      };
    }
    const products = await models.Product.findAll(options);
    if (!products) {
      throw boom.notFound('No products found');
    } else {
      return products;
    }
  }

  async find(id) {
    const product = await models.Product.findByPk(parseInt(id));
    if (!product) {
      throw boom.notFound('Product not found');
    } else {
      return product;
    }
  }
}

module.exports = ProductsService;
