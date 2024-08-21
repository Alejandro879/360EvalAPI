const EvaluacionService = require('@services/evaluacion.service');
const { validationResult } = require('express-validator');

class EvaluacionController {
  async listarEvaluaciones(req, res) {
    try {
      const evaluaciones = await EvaluacionService.listarEvaluaciones();
      res.json({ message: 'Evaluaciones listadas', status: 'success', code: 200, data: evaluaciones });
    } catch (error) {
      res.status(500).json({ message: 'Error al listar evaluaciones', status: 'error', code: 500, data: error.message });
    }
  }

  async obtenerEvaluacionPorId(req, res) {
    const { id } = req.params;
    try {
      const evaluacion = await EvaluacionService.obtenerEvaluacionPorId(id);
      if (!evaluacion) {
        return res.status(404).json({ message: 'Evaluación no encontrada', status: 'error', code: 404, data: null });
      }
      res.json({ message: 'Evaluación obtenida', status: 'success', code: 200, data: evaluacion });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener evaluación', status: 'error', code: 500, data: error.message });
    }
  }

  async crearEvaluacion(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Datos inválidos', status: 'error', code: 400, data: errors.array() });
    }

    try {
      const evaluacion = await EvaluacionService.crearEvaluacion(req.body);
      res.status(201).json({ message: 'Evaluación creada', status: 'success', code: 201, data: evaluacion });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear evaluación', status: 'error', code: 500, data: error.message });
    }
  }

  async actualizarEvaluacion(req, res) {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Datos inválidos', status: 'error', code: 400, data: errors.array() });
    }

    try {
      const evaluacionActualizada = await EvaluacionService.actualizarEvaluacion(id, req.body);
      if (!evaluacionActualizada) {
        return res.status(404).json({ message: 'Evaluación no encontrada', status: 'error', code: 404, data: null });
      }
      res.json({ message: 'Evaluación actualizada', status: 'success', code: 200, data: evaluacionActualizada });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar evaluación', status: 'error', code: 500, data: error.message });
    }
  }

  async enviarEvaluacion(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Datos inválidos', status: 'error', code: 400, data: errors.array() });
    }

    const { id } = req.params;
    try {
      const parametro = req.body;
      const respuestas = parametro.respuestas.map(respuesta => {
        return {
          preguntaId: respuesta.preguntaId,
          evaluacionId: id,
          evaluadorId: parametro.evaluadorId,
          evaluadoId: parametro.evaluadoId,
          valor: respuesta.value,
          fecha: respuesta.fecha
        }
      })
      const evaluacionEnviada = await EvaluacionService.enviarEvaluacion(id, respuestas);
      if (!evaluacionEnviada) {
        return res.status(404).json({ message: 'Evaluación no encontrada', status: 'error', code: 404, data: null });
      }
      res.json({ message: 'Evaluación enviada', status: 'success', code: 200, data: evaluacionEnviada });
    } catch (error) {
      res.status(500).json({ message: 'Error al enviar evaluación', status: 'error', code: 500, data: error.message });
    }
  }

  async eliminarEvaluacionPorId(req, res) {
    const { id } = req.params;
    try {
      const evaluacion = await EvaluacionService.eliminarEvaluacion(id);
      if (!evaluacion) {
        return res.status(404).json({ message: 'Evaluación no encontrada', status: 'error', code: 404, data: null });
      }
      res.json({ message: 'Evaluación obtenida', status: 'success', code: 200, data: evaluacion });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener evaluación', status: 'error', code: 500, data: error.message });
    }
  }
}

module.exports = new EvaluacionController();
