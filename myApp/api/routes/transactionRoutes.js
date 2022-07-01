const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

router.post('/', transactionController.create); // Create transaction
router.get('/', transactionController.list); // Get transactions
router.get('/:id', transactionController.detail); // transaction detail
router.put('/:id', transactionController.update); // Update transaction
router.delete('/:id', transactionController.delete); // Delete transaction


module.exports = router;