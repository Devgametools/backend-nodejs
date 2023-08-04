const express = require('express');
const router = express.Router();
const ProductsService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema} = require('../schemas/product.schema');

const service = new ProductsService();


router.get('/', getProducts);
router.get('/:id', validatorHandler(getProductSchema, 'params'), findProduct);
router.post('/', validatorHandler(createProductSchema, 'body'), createProduct);
router.patch('/:id', validatorHandler(getProductSchema, 'params'), validatorHandler(updateProductSchema, 'body'), updateProduct);
router.put('/:id', validatorHandler(getProductSchema, 'params'), validatorHandler(updateProductSchema, 'body'), updateProduct);
router.delete('/:id', validatorHandler(getProductSchema, 'params'), deleteProduct);

// ************************************************************************************
// ************************************************************************************

async function getProducts(req, res, next) {
  try {
    const products = await service.show();
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

async function createProduct(req, res, next) {
  try {
    const body = req.body;
    await service.create(body);
    res.status(201).json({ message: 'Item created successfully', body });
  } catch (error) {
    next(error)
  }
}

async function updateProduct (req, res, next) {
  try {
    const { id } = req.params;
    const body = req.body;
    await service.update(parseInt(id), body);
    res.status(202).json({ message: 'Item updated successfully', body });
  } catch (error) {
    next(error);
  }
}

async function deleteProduct (req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(parseInt(id));
    res.status(202).json({ message: 'Item deleted successfully', id });
  } catch (error) {
    next(error);
  }
}

module.exports = router;
