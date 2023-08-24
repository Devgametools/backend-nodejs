const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(3).max(15);

const createGenderSchema = joi.object({
  name: name.required(),
});

const updateGenderSchema = joi.object({
  name,
});

const getGenderSchema = joi.object({
  id: id.required(),
});

module.exports = { createGenderSchema, updateGenderSchema, getGenderSchema };
