const EvaluadorService = require('@services/Evaluador.service');
const { validationResult } = require('express-validator');

class EvaluadorController {
  async listarEvaluadores(req, res) {
    try {
      const evaluadores = await EvaluadorService.getAll();
      res.json({ message: 'Evaluadores listados', status: 'success', code: 200, data: evaluadores });
    } catch (error) {
      res.status(500).json({ message: 'Error al listar evaluadores', status: 'error', code: 500, data: error.message });
    }
  }

  async obtenerEvaluadorPorId(req, res) {
    const { id } = req.params;
    try {
      const evaluador = await EvaluadorService.getById(id);
      if (!evaluador) {
        return res.status(404).json({ message: 'Evaluador no encontrado', status: 'error', code: 404, data: null });
      }
      res.json({ message: 'Evaluador obtenido', status: 'success', code: 200, data: evaluador });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener evaluador', status: 'error', code: 500, data: error.message });
    }
  }

  async obtenerEvaluadoresPorEmpleadoId(req, res) {
    const { empleadoId } = req.params;
    try {
      const evaluadores = await EvaluadorService.getByEmpleadoId(empleadoId);
      res.json({ message: 'Evaluadores obtenidos', status: 'success', code: 200, data: evaluadores });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener evaluadores por ID de empleado', status: 'error', code: 500, data: error.message });
    }
  }

  async crearEvaluador(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Datos inválidos', status: 'error', code: 400, data: errors.array() });
    }

    try {
      const evaluador = await EvaluadorService.create(req.body);
      res.status(201).json({ message: 'Evaluador creado', status: 'success', code: 201, data: evaluador });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear evaluador', status: 'error', code: 500, data: error.message });
    }
  }

  async crearEvaluadorPorEmpleadoId(req, res) {
    const { empleadoId } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Datos inválidos', status: 'error', code: 400, data: errors.array() });
    }

    try {
      const evaluador = await EvaluadorService.createByEmpleadoId(empleadoId, req.body);
      res.status(201).json({ message: 'Evaluador creado por ID de empleado', status: 'success', code: 201, data: evaluador });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear evaluador por ID de empleado', status: 'error', code: 500, data: error.message });
    }
  }

  async crearEvaluadoresPorEmpleadoId(req, res) {
    const { empleadoId } = req.params;
    const { evaluadores } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Datos inválidos', status: 'error', code: 400, data: errors.array() });
    } 

    try {
      const evaluadoresResult = await EvaluadorService.createMultipleByEmpleadoId(empleadoId, evaluadores);
      res.status(201).json({ message: 'Evaluadores creados por ID de empleado', status: 'success', code: 201, data: evaluadoresResult });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear evaluadores por ID de empleado', status: 'error', code: 500, data: error.message });
    }
  }

  async actualizarEvaluador(req, res) {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Datos inválidos', status: 'error', code: 400, data: errors.array() });
    }

    try {
      const evaluadorActualizado = await EvaluadorService.update(id, req.body);
      if (!evaluadorActualizado) {
        return res.status(404).json({ message: 'Evaluador no encontrado', status: 'error', code: 404, data: null });
      }
      res.json({ message: 'Evaluador actualizado', status: 'success', code: 200, data: evaluadorActualizado });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar evaluador', status: 'error', code: 500, data: error.message });
    }
  }

  async eliminarEvaluadorPorEmpleadoId(req, res) {
    const { empleadoId } = req.params;
    try {
      const evaluadorEliminado = await EvaluadorService.deleteByEmpleadoId(empleadoId);
      if (!evaluadorEliminado) {
        return res.status(404).json({ message: 'Evaluador no encontrado', status: 'error', code: 404, data: null });
      }
      res.json({ message: 'Evaluador eliminado por ID de empleado', status: 'success', code: 200, data: evaluadorEliminado });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar evaluador por ID de empleado', status: 'error', code: 500, data: error.message });
    }
  }

  async eliminarEvaluadoresPorEmpleadoId(req, res) {
    const { empleadoId } = req.params;
    try {
      const evaluadoresEliminados = await EvaluadorService.deleteMultipleByEmpleadoId(empleadoId);
      res.json({ message: 'Evaluadores eliminados por ID de empleado', status: 'success', code: 200, data: evaluadoresEliminados });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar evaluadores por ID de empleado', status: 'error', code: 500, data: error.message });
    }
  }
}

module.exports = new EvaluadorController();
