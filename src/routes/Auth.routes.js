// routes/router.js
const express = require('express');
const router = express.Router();
const { registroUsuarioValidator, loginUsuarioValidator } = require('@middlewares/validation/Auth.validation');
const AuthController = require('@controllers/Auth.controller');
 
router.post('/register', registroUsuarioValidator, AuthController.register); 
router.post('/login', loginUsuarioValidator, AuthController.login);
 
module.exports = router;
