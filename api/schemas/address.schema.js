const joi = require('joi');

const id = joi.number().integer();
const country = joi.string();
const city = joi.string();
const address = joi.string();
const reference = joi.string();

const createAddressSchema = joi.object({
  country: country.required(),
  city: city.required(),
  address: address.required(),
  reference: reference.required(),
});

const updateAddressSchema = joi.object({
  country,
  city,
  address,
  reference,
});

const getAddressSchema = joi.object({
  id: id.required(),
});

module.exports = { createAddressSchema, updateAddressSchema, getAddressSchema };
