const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(3).max(50);
const description = joi.string().min(5).max(100);
const price = joi.number().integer().min(1);
const stock = joi.number().integer();
const categoryId =  joi.any().valid(1, 2, 3, 4, 5, 6); //'electronics', 'clothes', 'furnitures', 'shoes', 'toys', 'others'
const images = joi.array();
const limit = joi.number().integer();
const offset = joi.number().integer();
const price_min = joi.number().integer();
const price_max = joi.number().integer();

const createProductSchema = joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  stock: stock.required(),
  categoryId: categoryId.required(),
  images: images
});

const updateProductSchema = joi.object({
  name: name,
  description: description,
  price: price,
  stock: stock,
  categoryId: categoryId,
  images: images
});

const getProductSchema = joi.object({
  id: id.required()
});

const queryProductSchema = joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when('price_min', {
    is: joi.number().integer(),
    then: joi.required()
  })
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema };
