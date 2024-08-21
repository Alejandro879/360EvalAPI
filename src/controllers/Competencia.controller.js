const competenciaService = require('../services/Competencia.service');
const { validationResult } = require('express-validator');
 
class CompetenciaController {
  async listarcompetencias(req, res) {
    try {
      const competencias = await competenciaService.listarcompetencias();
      res.json({
        message: 'Lista de competencias obtenida exitosamente',
        status: 'success',
        code: 200,
        data: competencias
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error al obtener la lista de competencias',
        status: 'error',
        code: 500,
        data: null
      });
    }
  }

  async obtenercompetenciaPorId(req, res) {
    try {
      const { id } = req.params;
      const competencia = await competenciaService.obtenercompetenciaPorId(id);
      if (!competencia) {
        return res.status(404).json({
          message: 'Competencia no encontrado',
          status: 'failed',
          code: 404,
          data: null
        });
      }
      res.json({
        message: 'Competencia obtenido exitosamente',
        status: 'success',
        code: 200,
        data: competencia
      });
    } catch (error) {
      res.status(500).json({
        message: error.message ?? 'Error al obtener el competencia',
        status: 'error',
        code: 500,
        data: null
      });
    }
  }

  async crearcompetencia(req, res) {
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
      const competencia = await competenciaService.crearcompetencia(req.body);
      res.status(201).json({
        message: 'Competencia creado exitosamente',
        status: 'success',
        code: 201,
        data: competencia
      });
    } catch (error) {
      res.status(500).json({
        message: error.message ?? 'Error al crear el competencia',
        status: 'error',
        code: 500,
        data: null
      });
    }
  }

  async actualizarcompetencia(req, res) {
    try {
      const { id } = req.params;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: 'Error en los datos proporcionados',
          status: 'failed',
          code: 400,
          data: errors.array()
        });
      }

      const competenciaActualizado = await competenciaService.actualizarcompetencia(id, req.body);
      if (!competenciaActualizado) {
        return res.status(404).json({
          message: 'Competencia no encontrado',
          status: 'failed',
          code: 404,
          data: null
        });
      }
      res.json({
        message: 'Competencia actualizado exitosamente',
        status: 'success',
        code: 200,
        data: competenciaActualizado
      });
    } catch (error) {
      res.status(500).json({
        message: error.message ?? 'Error al actualizar el competencia',
        status: 'error',
        code: 500,
        data: null
      });
    }
  }

  async eliminarcompetencia(req, res) {
    try {
      const { id } = req.params;
      const competenciaEliminado = await competenciaService.eliminarcompetencia(id);
      if (!competenciaEliminado) {
        return res.status(404).json({
          message: 'Competencia no encontrado',
          status: 'failed',
          code: 404,
          data: null
        });
      }
      res.status(200).json({
        message: 'Competencia eliminado exitosamente',
        status: 'success',
        code: 200,
        data: competenciaEliminado
      });
    } catch (error) {
      res.status(500).json({
        message: error.message ?? 'Error al eliminar el competencia',
        status: 'error',
        code: 500,
        data: null
      });
    }
  }
}

module.exports = new CompetenciaController();
