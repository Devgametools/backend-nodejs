const express = require('express');

const GenderService = require('../services/gender.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { getGenderSchema } = require('./../schemas/gender.schema');

const router = express.Router();
const service = new GenderService();

// ************************************************************************************
//  *-- ROUTES --*
// ************************************************************************************

router.get('/', getGenders);
router.get('/:id', validatorHandler(getGenderSchema, 'params'), getGender);

// ************************************************************************************
//  *-- GENDER FUNCTIONS--*
// ************************************************************************************

async function getGenders(req, res, next) {
  try {
    const genders = await service.show();
    res.json(genders);
  } catch (error) {
    next(error);
  }
}

async function getGender(req, res, next) {
  try {
    const { id } = req.params;
    const gender = await service.find(id);
    res.json(gender);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
