const express = require('express');
const router = express.Router();
const ProductsService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getProductSchema,
  queryProductSchema,
} = require('../schemas/product.schema');

const service = new ProductsService();

// ************************************************************************************
//  *-- ROUTES --*
// ************************************************************************************

router.get('/', validatorHandler(queryProductSchema, 'query'), getProducts);
router.get('/:id', validatorHandler(getProductSchema, 'params'), findProduct);

// ************************************************************************************
//  *-- PRODUCT FUNCTIONS --*
// ************************************************************************************

async function getProducts(req, res, next) {
  try {
    const products = await service.show(req.query);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

async function findProduct(req, res, next) {
  try {
    const { id } = req.params;
    const product = await service.find(parseInt(id));
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
