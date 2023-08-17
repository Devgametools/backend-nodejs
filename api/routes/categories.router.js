const express = require('express');

const CategoryService = require('../services/categrories.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('./../schemas/category.schema');

const router = express.Router();
const service = new CategoryService();

router.get('/', getCategories);
router.get('/:id', validatorHandler(getCategorySchema, 'params'), getCategory);
router.post('/', validatorHandler(createCategorySchema, 'body'), createCategory);
router.patch('/:id', validatorHandler(getCategorySchema, 'params'), validatorHandler(updateCategorySchema, 'body'), updateCategory);
router.delete('/:id', validatorHandler(getCategorySchema, 'params'), deleteCategory);


// ************************************************************************************
// ************************************************************************************

async function getCategories (req, res, next) {
  try {
    const categories = await service.show();
    res.json(categories);
  } catch (error) {
    next(error);
  }
}

async function getCategory (req, res, next) {
  try {
    const { id } = req.params;
    const category = await service.find(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
}

async function createCategory (req, res, next) {
  try {
    const body = req.body;
    const newCategory = await service.create(body);
    res.status(201).json({message: 'Category created successfully', newCategory});
  } catch (error) {
    next(error);
  }
}

async function updateCategory (req, res, next) {
  try {
    const { id } = req.params;
    const body = req.body;
    const category = await service.update(id, body);
    res.json({message: 'Category updated successfully', category});
  } catch (error) {
    next(error);
  }
}

async function deleteCategory (req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(parseInt(id));
    res.status(201).json({message: 'Category deleted successfully', id});
  } catch (error) {
    next(error);
  }
}

module.exports = router;
