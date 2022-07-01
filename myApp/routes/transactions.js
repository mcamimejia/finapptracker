const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactionController');

const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, transactionController.getAll); //All transactions 
router.get('/category/:id', authMiddleware, transactionController.byCategory); // Transactions by category
router.get('/type/:id', authMiddleware, transactionController.byType); // Transactions by type
router.get('/add', authMiddleware, transactionController.creationForm); // Add transaction form
router.post('/add', authMiddleware, transactionController.create); // Add transaction process
router.get('/detail/:id', authMiddleware, transactionController.detail); // Transaction detail
router.get('/edit/:id', authMiddleware, transactionController.editForm); // Edit transaction form
router.put('/edit/:id', authMiddleware, transactionController.update); // Edit transaction process
router.get('/delete/:id', authMiddleware, transactionController.delete); // Delete transaction process

module.exports = router;