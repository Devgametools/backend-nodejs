const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(3).max(15);

const createTargetSchema = joi.object({
  name: name.required(),
});

const updateTargetSchema = joi.object({
  name,
});

const getTargetSchema = joi.object({
  id: id.required(),
});

module.exports = { createTargetSchema, updateTargetSchema, getTargetSchema };
