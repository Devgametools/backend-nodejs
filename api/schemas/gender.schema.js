const joi = require('joi');

const id = joi.number().integer();

const getGenderSchema = joi.object({
  id: id.required(),
});

module.exports = { getGenderSchema };
