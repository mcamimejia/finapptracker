const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

// Create category
router.post('/', categoryController.create);

// Get categories
router.get('/', categoryController.list);

// category detail
router.get('/:id', categoryController.detail);

// Update category
router.put('/:id', categoryController.update);

// Delete category
router.delete('/:id', categoryController.delete);


module.exports = router;