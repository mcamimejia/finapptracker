const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactionController');

const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, transactionController.getAll);
router.get('/category/:id', authMiddleware, transactionController.byCategory);
router.get('/type/:type', authMiddleware, transactionController.byType);
router.get('/add', authMiddleware, transactionController.creationForm);
router.get('/detail/:id', authMiddleware, transactionController.detail);
router.get('/edit/:id', authMiddleware, transactionController.editForm);

module.exports = router;