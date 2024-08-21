const express = require('express');
const request = require('supertest');
const mockingoose = require('mockingoose');
const CompetenciaController = require('../controllers/Competencia.controller');
const CompetenciaService = require('../services/Competencia.service');
const Competencia = require('../models/Competencia.model');

const app = express();
app.use(express.json());
// Ruta para pruebas
app.get('/competencias', CompetenciaController.listarcompetencias.bind(CompetenciaController));
app.get('/competencias/:id', CompetenciaController.obtenercompetenciaPorId.bind(CompetenciaController));
app.post('/competencias', CompetenciaController.crearcompetencia.bind(CompetenciaController));
app.put('/competencias/:id', CompetenciaController.actualizarcompetencia.bind(CompetenciaController));
app.delete('/competencias/:id', CompetenciaController.eliminarcompetencia.bind(CompetenciaController));

// Mockea el módulo CompetenciaService
jest.mock('../services/Competencia.service', () => ({
    listarcompetencias: jest.fn(),
    obtenercompetenciaPorId: jest.fn(),
    crearcompetencia: jest.fn(),
    actualizarcompetencia: jest.fn(),
    eliminarcompetencia: jest.fn(),
  }));

describe('CompetenciaController', () => {
  afterEach(() => {
    mockingoose.resetAll();
  });

  describe('GET /competencias', () => {
    it('debería listar todas las competencias', async () => {
      const mockCompetencias = [
        { _id: '1', nombre: 'Competencia 1' },
        { _id: '2', nombre: 'Competencia 2' }
      ];

      CompetenciaService.listarcompetencias.mockResolvedValue(mockCompetencias);

      const res = await request(app).get('/competencias');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Lista de competencias obtenida exitosamente');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveLength(mockCompetencias.length);
    });

    it('debería retornar un error si ocurre un problema al listar competencias', async () => {
      CompetenciaService.listarcompetencias.mockRejectedValue(new Error('Error al listar competencias'));

      const res = await request(app).get('/competencias');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'Error al obtener la lista de competencias');
    });
  });

  describe('GET /competencias/:id', () => {
    it('debería obtener una competencia por ID', async () => {
      const mockCompetencia = { _id: '1', nombre: 'Competencia 1' };

      CompetenciaService.obtenercompetenciaPorId.mockResolvedValue(mockCompetencia);

      const res = await request(app).get('/competencias/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Competencia obtenido exitosamente');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('_id', '1');
    });

    it('debería retornar un error si la competencia no existe', async () => {
      CompetenciaService.obtenercompetenciaPorId.mockResolvedValue(null);

      const res = await request(app).get('/competencias/1');

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Competencia no encontrado');
    });

    it('debería retornar un error si ocurre un problema al obtener la competencia', async () => {
      CompetenciaService.obtenercompetenciaPorId.mockRejectedValue(new Error('Error al obtener competencia'));

      const res = await request(app).get('/competencias/1');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'Error al obtener competencia');
    });
  });

  describe('POST /competencias', () => {
    it('debería crear una nueva competencia', async () => {
      const mockCompetencia = { _id: '1', nombre: 'Competencia 1' };

      CompetenciaService.crearcompetencia.mockResolvedValue(mockCompetencia);

      const res = await request(app)
        .post('/competencias')
        .send({ nombre: 'Competencia 1' });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('message', 'Competencia creado exitosamente');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('_id', '1');
    });

    it('debería retornar un error si ocurre un problema al crear la competencia', async () => {
      CompetenciaService.crearcompetencia.mockRejectedValue(new Error('Error al crear competencia'));

      const res = await request(app)
        .post('/competencias')
        .send({ nombre: 'Competencia 1' });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'Error al crear competencia');
    });
  });

  describe('PUT /competencias/:id', () => {
    it('debería actualizar una competencia existente', async () => {
      const mockCompetencia = { _id: '1', nombre: 'Competencia Actualizada' };

      CompetenciaService.actualizarcompetencia.mockResolvedValue(mockCompetencia);

      const res = await request(app)
        .put('/competencias/1')
        .send({ nombre: 'Competencia Actualizada' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Competencia actualizado exitosamente');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('_id', '1');
    });

    it('debería retornar un error si la competencia no existe', async () => {
      CompetenciaService.actualizarcompetencia.mockResolvedValue(null);

      const res = await request(app)
        .put('/competencias/1')
        .send({ nombre: 'Competencia Actualizada' });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Competencia no encontrado');
    });

    it('debería retornar un error si ocurre un problema al actualizar la competencia', async () => {
      CompetenciaService.actualizarcompetencia.mockRejectedValue(new Error('Error al actualizar competencia'));

      const res = await request(app)
        .put('/competencias/1')
        .send({ nombre: 'Competencia Actualizada' });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'Error al actualizar competencia');
    });
  });

  describe('DELETE /competencias/:id', () => {
    it('debería eliminar una competencia existente', async () => {
      const mockCompetencia = { _id: '1', nombre: 'Competencia Eliminada' };

      CompetenciaService.eliminarcompetencia.mockResolvedValue(mockCompetencia);

      const res = await request(app).delete('/competencias/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Competencia eliminado exitosamente');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('_id', '1');
    });

    it('debería retornar un error si la competencia no existe', async () => {
      CompetenciaService.eliminarcompetencia.mockResolvedValue(null);

      const res = await request(app).delete('/competencias/1');

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Competencia no encontrado');
    });

    it('debería retornar un error si ocurre un problema al eliminar la competencia', async () => {
      CompetenciaService.eliminarcompetencia.mockRejectedValue(new Error('Error al eliminar competencia'));

      const res = await request(app).delete('/competencias/1');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'Error al eliminar competencia');
    });
  });
});
