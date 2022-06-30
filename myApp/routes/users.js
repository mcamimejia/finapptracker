const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/register', userController.registerForm); // Register Form
router.post('/register', userController.create); // Create user
router.get('/login', userController.loginForm); // Login Form
router.post('/login', userController.login); // Login process
router.get('/profile/:id', userController.profile); // Profile
router.get('/edit/:id', userController.editForm); // Edition Form
router.put('/edit/:id', userController.update); // Edit user
router.delete('/:id', userController.delete); // Delete user
router.post('/logout', userController.logout); // Logout process

module.exports = router;