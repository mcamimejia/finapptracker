const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', userController.create); // Create user
router.get('/', userController.list); // Get users
router.get('/:id', userController.detail); // User detail
router.put('/:id', userController.update); // Update user
router.delete('/:id', userController.delete); // Delete user


module.exports = router;