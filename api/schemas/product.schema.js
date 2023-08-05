const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(3).max(50);
const description = joi.string().min(5).max(100);
const price = joi.number().min(1);
const stock = joi.number().integer();
const category =  joi.any().valid('electronics', 'clothes', 'furnitures', 'shoes', 'others');

const createProductSchema = joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  stock: stock.required(),
  id: id,
  category: category.required()
});

const updateProductSchema = joi.object({
  name: name,
  description: description,
  price: price,
  stock: stock,
  category: category
});

const getProductSchema = joi.object({
  id: id.required()
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
