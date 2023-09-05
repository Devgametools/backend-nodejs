const joi = require('joi');

const id = joi.number().integer();
const limit = joi.number().integer();
const offset = joi.number().integer();
const price_min = joi.number().integer();
const price_max = joi.number().integer();

const getProductSchema = joi.object({
  id: id.required(),
});

const queryProductSchema = joi.object({
  limit,
  offset,
  price_min,
  price_max,
});

module.exports = {
  getProductSchema,
  queryProductSchema,
};
