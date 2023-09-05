const express = require('express');

const TargetService = require('../services/target.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { getTargetSchema } = require('./../schemas/target.schema');

const router = express.Router();
const service = new TargetService();

// ************************************************************************************
//  *-- ROUTES --*
// ************************************************************************************

router.get('/', getTargets);
router.get('/:id', validatorHandler(getTargetSchema, 'params'), getTarget);

// ************************************************************************************
//  *-- GENDER FUNCTIONS--*
// ************************************************************************************

async function getTargets(req, res, next) {
  try {
    const targets = await service.show();
    res.json(targets);
  } catch (error) {
    next(error);
  }
}

async function getTarget(req, res, next) {
  try {
    const { id } = req.params;
    const target = await service.find(id);
    res.json(target);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
