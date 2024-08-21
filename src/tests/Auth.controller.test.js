const request = require('supertest');
const express = require('express');
const AuthController = require('../controllers/Auth.controller');
const authRoutes = express.Router();
const mockingoose = require('mockingoose');
const User = require('../models/Usuario.model');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env' })
authRoutes.post('/register', AuthController.register);
authRoutes.post('/login', AuthController.login);

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
 

describe('AuthController', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  describe('POST /auth/register', () => {
    it('debería registrar un nuevo usuario', async () => {
      const mockUser = {
        _id: '507f191e810c19729de860ea',
        usuario: 'testuser',
        contraseña: 'hashedpassword',
        rol: 'employee',
        nombre: 'Test',
        apellido: 'User',
        email: 'test@example.com'
      };

      mockingoose(User).toReturn(null, 'findOne');
      mockingoose(User).toReturn(mockUser, 'save');

      const res = await request(app)
        .post('/auth/register')
        .send({
          usuario: 'testuser',
          contraseña: 'password',
          rol: 'employee',
          nombre: 'Test',
          apellido: 'User',
          email: 'test@example.com'
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('usuario', 'testuser');
    });

    it('debería retornar un error si el nombre de usuario ya existe', async () => {
      const existingUser = {
        _id: '507f191e810c19729de860ea',
        usuario: 'testuser',
        contraseña: 'hashedpassword',
        rol: 'employee',
        nombre: 'Test',
        apellido: 'User',
        email: 'test@example.com'
      };

      mockingoose(User).toReturn(existingUser, 'findOne');

      const res = await request(app)
        .post('/auth/register')
        .send({
          usuario: 'testuser',
          contraseña: 'password',
          rol: 'employee',
          nombre: 'Test',
          apellido: 'User',
          email: 'test@example.com'
        });

      expect(res.statusCode).toEqual(409);
      expect(res.body).toHaveProperty('message', 'El nombre de usuario ya está en uso.');
    });
  });

  describe('POST /auth/login', () => {
    it('debería loguear un usuario existente', async () => {
      // Mocks de datos del usuario
      const mockUser = {
          _id: '507f191e810c19729de860ea',
          usuario: 'testuser',
          contraseña: await bcrypt.hash('password', 10), // Contraseña cifrada
          rol: 'employee',
          nombre: 'Test',
          apellido: 'User',
          email: 'test@example.com'
      };

      // Mock de la respuesta de la base de datos
      mockingoose(User).toReturn(mockUser, 'findOne');

      const res = await request(app)
          .post('/auth/login')
          .send({
              usuario: 'testuser',
              contraseña: 'password', // Contraseña original (no cifrada)
          });
 
      // Verificar que la respuesta sea 200 OK
      expect(res.statusCode).toEqual(200);
      // Verificar que la respuesta contenga un token
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('token');
  });

    it('debería retornar un error si las credenciales son inválidas', async () => {
      mockingoose(User).toReturn(null, 'findOne');

      const res = await request(app)
        .post('/auth/login')
        .send({
          usuario: 'invaliduser',
          contraseña: 'password',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Credenciales inválidas.');
    });
  });
});
