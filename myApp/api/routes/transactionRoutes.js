const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

// Create transaction
router.post('/', transactionController.create);

// Get transactions
router.get('/', transactionController.list);

// Get transactions by user
router.get('/user/:id', transactionController.byUser);

// Get transactions by category
router.get('/category/:id', transactionController.byCategory);

// transaction detail
router.get('/:id', transactionController.detail);

// Update transaction
router.patch('/:id', transactionController.update);

// Delete user
router.delete('/:id', transactionController.delete);


module.exports = router;