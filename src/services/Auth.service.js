// services/Auth.service.js
const User = require('../models/Usuario.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
    async register(userData) {
        const { usuario, contraseña, rol, nombre, apellido, email } = userData;

        const existingUser = await User.findOne({ usuario });
        if (existingUser) {
            throw new Error('El nombre de usuario ya está en uso.');
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(contraseña, salt);

        const user = new User({ usuario, contraseña: hashed, rol, nombre, apellido, email });
        await user.save();

        return { id: user._id, usuario: user.usuario, rol: user.rol, nombre: user.nombre, apellido: user.apellido, email: user.email };
    }

    async login(credentials) {
        const { usuario, contraseña } = credentials;

        const user = await User.findOne({ usuario });
        if (!user) {
            throw new Error('Credenciales inválidas.');
        }

        const isMatch = await bcrypt.compare(contraseña, user.contraseña);
        if (!isMatch) {
            throw new Error('Credenciales inválidas.');
        }

        const token = jwt.sign({ userId: user._id, rol: user.rol, usuario: user.usuario }, process.env.JWT_SECRET);

        return { token };
    }
}

module.exports = new AuthService();
