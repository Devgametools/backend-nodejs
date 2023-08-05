const { faker } = require("@faker-js/faker");
const boom = require('@hapi/boom');

class ProductsService {

  constructor () {
    this.products = [];
    this.generate();
  }

  async generate () {
    const limit = 10;
    const categories = ['electronics', 'clothes', 'furnitures', 'shoes', 'others'];
    for (let i = 0; i < limit; i++) {
      let index = Math.floor(Math.random() * 5);
      this.products.push({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price(), 10),
        stock: Math.floor(Math.random() * 10),
        id: i + 1,
        category: categories[index]
      })
    }
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
    if (this.products.length == 0) {
      throw boom.notFound('No products found');
    } else {
      return this.products;
    }
  }

  async find (id) {
    const item = this.products.find(item => item.id === id);
    if (!item) {
      throw boom.notFound('Product not found');
    } else {
      return item;
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
