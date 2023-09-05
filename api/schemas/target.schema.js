const joi = require('joi');

const id = joi.number().integer();

const getTargetSchema = joi.object({
  id: id.required(),
});

module.exports = { getTargetSchema };
