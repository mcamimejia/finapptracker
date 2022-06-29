const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactionController');

router.get('/', transactionController.getAll);
router.get('/category/:id', transactionController.byCategory);
router.get('/type/:type', transactionController.byType);
router.get('/add', transactionController.creationForm);
router.get('/detail/:id', transactionController.detail);
router.get('/edit/:id', transactionController.editForm);

module.exports = router;