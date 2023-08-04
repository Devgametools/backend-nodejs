const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(3).max(15);
const description = joi.string().min(5).max(50);
const adjective = joi.string().min(1).max(15);
const material = joi.string().min(1).max(15);
const price = joi.number().min(5);
const stock = joi.number().integer();

const createProductSchema = joi.object({
  name: name.required(),
  description: description.required(),
  adjective: adjective.required(),
  material: material.required(),
  price: price.required(),
  stock: stock.required(),
  id: id,
});

const updateProductSchema = joi.object({
  name: name,
  description: description,
  adjective: adjective,
  material: material,
  price: price,
  stock: stock
});

const getProductSchema = joi.object({
  id: id.required()
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema};
