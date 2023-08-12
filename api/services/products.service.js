const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ProductsService {

  constructor () {}

  async create (data) {
    const newProduct = await models.Product.create(data);
    if (!newProduct) {
      throw boom.badData('No data found to create new Product');
    } else {
      return newProduct;
    }
  }

  async show () {
    const products = await models.Product.findAll({include: ['category']});
    if (!products) {
      throw boom.notFound('No products found');
    } else {
      return products;
    }
  }

  async find (id) {
    const product = await models.Product.findByPk(parseInt(id));
    if (!product) {
      throw boom.notFound('Product not found');
    } else {
      return product;
    }
  }

  async update (id, changes) {
    const product = await this.find(id);
    if (!product) {
      throw boom.notFound('Product not found')
    } else {
      const newProduct = await product.update(changes);
      return newProduct;
    }
  }

    async delete (id) {
      const product = await this.find(id);
      if (!product) {
        throw boom.notFound('Product not found')
      } else {
          await product.destroy();
      }
      return { id };
    }
  }

module.exports = ProductsService;
