const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const ProductService = require('./products.service');

const products = new ProductService();

class CartService {
  constructor() {}

  async show(id) {
    const items = await models.Cart.findAll({
      where: { customerId: id },
      include: [
        {
          association: 'product',
        },
      ],
    });
    return items;
  }

  async find(id) {
    const item = await models.Cart.findByPk(id, {
      include: ['product'],
    });
    if (!item) {
      throw boom.notFound('Item no existe en el shopping cart');
    } else {
      return item;
    }
  }

  async findProduct(productId, customerId) {
    const item = await models.Cart.findOne({
      where: {
        productId: productId,
        customerId: customerId,
      },
      include: [
        {
          association: 'product',
        },
      ],
    });
    if (item) {
      return item;
    } else {
      return {
        message: 'Item no existe en el shopping cart',
      };
    }
  }

  async addItem(data, id) {
    const product = await products.find(data.productId);
    const itemInCart = await this.findProduct(data.productId, id);
    if (itemInCart.id) {
      const validateStock = itemInCart.quantity + 1 <= product.stock;
      if (validateStock) {
        itemInCart.set({ quantity: itemInCart.quantity + 1 });
        itemInCart.save();
        return {
          message: 'Producto agregado al Shopping Cart',
          product: itemInCart,
        };
      } else {
        return {
          message:
            'No hay suficiente stock para la cantidad solicitada del siguiente producto',
        };
      }
    } else {
      const validateStock = product.stock >= 1;
      if (validateStock) {
        const item = await models.Cart.create({ ...data, customerId: id });
        return {
          message: 'Producto agregado al Shopping Cart',
          Cart_Info: item,
          Product_Detail: product,
        };
      } else {
        return {
          message:
            'No hay suficiente stock para la cantidad solicitada del siguiente producto',
          Product_detail: product,
        };
      }
    }
  }

  async update(productId, customerId, changes) {
    const item = await this.findProduct(productId, customerId);
    if (item.id) {
      const product = await products.find(productId);
      const validateStock = changes.quantity <= product.stock;
      if (validateStock) {
        await item.update(changes);
        return {
          message: 'Producto actualizado correctamente',
          Cart_Detail: item,
        };
      } else {
        return {
          message: 'No hay suficiente stock para la cantidad solicitada',
          Product_Detail: product,
        };
      }
    } else {
      return {
        message: 'Item no existe en el shopping cart',
      };
    }
  }

  async delete(productId, customerId) {
    const item = await this.findProduct(productId, customerId);
    if (item.id) {
      return (
        item.destroy(),
        {
          message: 'Producto eliminado del shopping cart',
        }
      );
    } else {
      return {
        message: 'Item no existe en el shopping cart',
      };
    }
  }
}

module.exports = CartService;
