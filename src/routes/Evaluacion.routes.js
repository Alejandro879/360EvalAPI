const express = require('express');
const router = express.Router();
const EvaluacionController = require('@controllers/Evaluacion.controller');
const { validarEvaluacion, validarIdEvaluacion, validarEvaluacionActualizar, validarEvaluacionSubmit } = require('@middlewares/validation/Evaluaciones.validation');
const authMiddleware = require('@middlewares/Auth.middleware');
 
router.post('/', authMiddleware(['admin', 'manager']), validarEvaluacion, EvaluacionController.crearEvaluacion);
router.get('/', authMiddleware(['admin', 'manager']), EvaluacionController.listarEvaluaciones);
router.get('/:id', authMiddleware(['admin', 'manager', 'employee']), validarIdEvaluacion, EvaluacionController.obtenerEvaluacionPorId);
router.put('/:id', authMiddleware(['admin']), validarIdEvaluacion, validarEvaluacionActualizar, EvaluacionController.actualizarEvaluacion);
router.delete('/:id', authMiddleware(['admin', 'manager']), validarIdEvaluacion, EvaluacionController.eliminarEvaluacionPorId);
router.post('/:id/submit', authMiddleware(['admin', 'manager', 'employee']), validarIdEvaluacion, validarEvaluacionSubmit, EvaluacionController.enviarEvaluacion);

module.exports = router;
