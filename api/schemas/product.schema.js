const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(3).max(50);
const description = joi.string().min(5).max(100);
const price = joi.number().min(1);
const stock = joi.number().integer();
const categoryId =  joi.number().integer().max(20);
const targetId = joi.number().integer().max(2);
const genderId = joi.number().integer().max(2);
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
  targetId: targetId.required(),
  genderId: genderId.required(),
  images
});

const updateProductSchema = joi.object({
  name,
  description,
  price,
  stock,
  categoryId,
  targetId,
  genderId,
  images
});

const getProductSchema = joi.object({
  id: id.required()
});

const queryProductSchema = joi.object({
  limit,
  offset,
  price_min,
  price_max
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema };
