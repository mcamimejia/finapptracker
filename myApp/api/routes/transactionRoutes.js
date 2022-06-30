const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

// Create transaction
router.post('/', transactionController.create);

// Get transactions
router.get('/', transactionController.list);

// transaction detail
router.get('/:id', transactionController.detail);

// Update transaction
router.put('/:id', transactionController.update);

// Delete transaction
router.delete('/:id', transactionController.delete);


module.exports = router;