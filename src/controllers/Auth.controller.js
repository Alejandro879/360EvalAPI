// controllers/Auth.controller.js
const AuthService = require('../services/Auth.service');
const { validationResult } = require('express-validator');

class AuthController {
    async register(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Error en los datos proporcionados',
                    status: 'failed',
                    code: 400,
                    data: errors.array()
                });
            }
            const userData = req.body;
            const user = await AuthService.register(userData);

            return res.status(201).json({
                message: 'Usuario registrado exitosamente.',
                status: 'success',
                code: 201,
                data: user
            });
        } catch (error) {
            const statusCode = error.message === 'El nombre de usuario ya está en uso.' ? 409 : 500;
            return res.status(statusCode).json({
                message: error.message,
                status: 'failed',
                code: statusCode,
                data: null
            });
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Error en los datos proporcionados',
                    status: 'failed',
                    code: 400,
                    data: errors.array()
                });
            }
            const credentials = req.body;
            const tokenData = await AuthService.login(credentials);

            return res.status(200).json({
                message: 'Inicio de sesión exitoso.',
                status: 'success',
                code: 200,
                data: tokenData
            });
        } catch (error) {
            const statusCode = error.message === 'Credenciales inválidas.' ? 400 : 500;
            return res.status(statusCode).json({
                message: error.message,
                status: 'failed',
                code: statusCode,
                data: null
            });
        }
    }
}

module.exports = new AuthController();
