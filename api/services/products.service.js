const boom = require('@hapi/boom');

const pool = require('../libs/postgres.pool');

class ProductsService {

  constructor () {
    this.products = [];
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
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
    const resultSet = await this.pool.query(query);
    if (resultSet.length == 0) {
      throw boom.notFound('No products found');
    } else {
      return resultSet.rows;
    }
  }

  async find (id) {
    const resultSet = await this.pool.query(`SELECT * FROM products WHERE id = '${id}'`);
    if (resultSet.length == 0) {
      throw boom.notFound('Product not found');
    } else {
      return resultSet.rows;
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
