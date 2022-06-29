const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Create user
router.post('/', userController.create);

// Get users
router.get('/', userController.list);

// User detail
router.get('/:id', userController.detail);

// Update user
router.put('/:id', userController.update);

// Delete user
router.delete('/:id', userController.delete);


module.exports = router;