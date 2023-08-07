const boom = require('@hapi/boom');

const sequelize = require('../libs/sequelize');

class ProductsService {

  constructor () {
    this.products = [];
  }

  async create (data) {
    if (!data) {
      throw boom.badData('No data found to create new Product');
    } else {
      data.id = this.products.length + 1;
      this.products.push(data);
      return data;
    }
  }

  async show () {
    const query = 'SELECT * FROM products';
    const [data] = await sequelize.query(query);
    if (data.length == 0) {
      throw boom.notFound('No products found');
    } else {
      return data;
    }
  }

  async find (id) {
    const [data] = await sequelize.query(`SELECT * FROM products WHERE id = '${id}'`);
    if (data.length == 0) {
      throw boom.notFound('Product not found');
    } else {
      return data;
    }
  }

  async update (id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found')
    } else {
      const product = this.products[index];
         this.products[index] = {
          ...product,
          ...changes
         };
    }
    return this.products[index];
    }

    async delete (id) {
      const index = this.products.findIndex(item => item.id === id);
      if (index === -1) {
        throw boom.notFound('Product not found')
      } else {
          this.products.splice(index, 1);
      }
      return { id };
    }
  }

module.exports = ProductsService;
