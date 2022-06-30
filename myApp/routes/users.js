const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

//middlewares
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const validationsMiddleware = require('../middlewares/validationsMiddleware');

router.get('/register', guestMiddleware, userController.registerForm); // Register Form
router.post('/register', validationsMiddleware, userController.create); // Create user
router.get('/login', guestMiddleware, userController.loginForm); // Login Form
router.post('/login', userController.login); // Login process
router.get('/profile/:id', authMiddleware, userController.profile); // Profile
router.get('/edit/:id', authMiddleware, userController.editForm); // Edition Form
router.put('/edit/:id', validationsMiddleware, userController.update); // Edit user
router.delete('/:id', userController.delete); // Delete user
router.post('/logout', userController.logout); // Logout process

module.exports = router;