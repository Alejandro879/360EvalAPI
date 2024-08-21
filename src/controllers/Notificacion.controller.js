const notificacionService = require('@services/Notificacion.service');
const { validationResult } = require('express-validator');

class NotificacionController {
  async listarnotificacions(req, res) {
    try {
      const notificacions = await notificacionService.listarnotificacions();
      res.json({
        message: 'Lista de notificacions obtenida exitosamente',
        status: 'success',
        code: 200,
        data: notificacions
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error al obtener la lista de notificacions',
        status: 'error',
        code: 500,
        data: null
      });
    }
  }

  async obtenernotificacionPorId(req, res) {
    try {
      const { id } = req.params;
      const notificacion = await notificacionService.obtenernotificacionPorId(id);
      if (!notificacion) {
        return res.status(404).json({
          message: 'Notificacion no encontrado',
          status: 'failed',
          code: 404,
          data: null
        });
      }
      res.json({
        message: 'Notificacion obtenido exitosamente',
        status: 'success',
        code: 200,
        data: notificacion
      });
    } catch (error) {
      res.status(500).json({
        message: error.message ?? 'Error al obtener el notificacion',
        status: 'error',
        code: 500,
        data: null
      });
    }
  }
  
async listarnotificacionsxempleado(req, res) {
    try {
      const { id } = req.params;
      const notificacion = await notificacionService.listarnotificacionsxempleado(id);
      if (!notificacion) {
        return res.status(404).json({
          message: 'Notificacion no encontrado',
          status: 'failed',
          code: 404,
          data: null
        });
      }
      res.json({
        message: 'Notificacion obtenido exitosamente',
        status: 'success',
        code: 200,
        data: notificacion
      });
    } catch (error) {
      res.status(500).json({
        message: error.message ?? 'Error al obtener el notificacion',
        status: 'error',
        code: 500,
        data: null
      });
    }
  }

  async crearnotificacion(req, res) {
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
      const notificacion = await notificacionService.crearnotificacion(req.body);
      res.status(201).json({
        message: 'Notificacion creado exitosamente',
        status: 'success',
        code: 201,
        data: notificacion
      });
    } catch (error) {
      res.status(500).json({
        message: error.message ?? 'Error al crear el notificacion',
        status: 'error',
        code: 500,
        data: null
      });
    }
  }

  async actualizarnotificacion(req, res) {
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

      const notificacionActualizado = await notificacionService.actualizarnotificacion(id, req.body);
      if (!notificacionActualizado) {
        return res.status(404).json({
          message: 'Notificacion no encontrado',
          status: 'failed',
          code: 404,
          data: null
        });
      }
      res.json({
        message: 'Notificacion actualizado exitosamente',
        status: 'success',
        code: 200,
        data: notificacionActualizado
      });
    } catch (error) {
      res.status(500).json({
        message: error.message ?? 'Error al actualizar el notificacion',
        status: 'error',
        code: 500,
        data: null
      });
    }
  }

  async eliminarnotificacion(req, res) {
    try {
      const { id } = req.params;
      const notificacionEliminado = await notificacionService.eliminarnotificacion(id);
      if (!notificacionEliminado) {
        return res.status(404).json({
          message: 'Notificacion no encontrado',
          status: 'failed',
          code: 404,
          data: null
        });
      }
      res.status(200).json({
        message: 'Notificacion eliminado exitosamente',
        status: 'success',
        code: 200,
        data: notificacionEliminado
      });
    } catch (error) {
      res.status(500).json({
        message: error.message ?? 'Error al eliminar el notificacion',
        status: 'error',
        code: 500,
        data: null
      });
    }
  }
}

module.exports = new NotificacionController();
