const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/register', userController.registerForm);
router.get('/login', userController.loginForm);
router.get('/profile', userController.profile);
router.get('/edit', userController.editForm);

router.get('/logout', userController.logout);

module.exports = router;