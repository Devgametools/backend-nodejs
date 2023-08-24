const joi = require('joi');

const id = joi.number().integer();
const customerId = joi.number().integer();
const country = joi.string();
const city = joi.string();
const address = joi.string();

const createAddressSchema = joi.object({
  customerId: customerId.required(),
  country: country.required(),
  city: city.required(),
  address: address.required()
});

const updateAddressSchema = joi.object({
  country,
  city,
  address
});

const getAddressSchema = joi.object({
  id: id.required()
})

module.exports = { createAddressSchema, updateAddressSchema, getAddressSchema };
