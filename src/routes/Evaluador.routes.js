const express = require('express');
const router = express.Router();
const EvaluadorController = require('@controllers/Evaluador.controller');
const { validarEvaluador, validarIdEvaluador, validarMultipleEvaluadores } = require('@middlewares/validation/Evaluador.validacion');
const authMiddleware = require('@middlewares/Auth.middleware');

router.post('/', authMiddleware(['admin', 'manager']), validarEvaluador, EvaluadorController.crearEvaluador);
router.get('/', authMiddleware(['admin', 'manager']), EvaluadorController.listarEvaluadores);
router.get('/:id', authMiddleware(['admin', 'manager']), validarIdEvaluador, EvaluadorController.obtenerEvaluadorPorId);
router.get('/empleado/:empleadoId', authMiddleware(['admin', 'manager']), validarIdEvaluador, EvaluadorController.obtenerEvaluadoresPorEmpleadoId);
router.post('/empleado/:empleadoId', authMiddleware(['admin', 'manager']), validarEvaluador, EvaluadorController.crearEvaluadorPorEmpleadoId);
router.post('/empleado/:empleadoId/multiple', authMiddleware(['admin', 'manager']), validarMultipleEvaluadores, EvaluadorController.crearEvaluadoresPorEmpleadoId);
router.put('/:id', authMiddleware(['admin']), validarIdEvaluador, validarEvaluador, EvaluadorController.actualizarEvaluador);
router.delete('/empleado/:empleadoId', authMiddleware(['admin', 'manager']), validarIdEvaluador, EvaluadorController.eliminarEvaluadorPorEmpleadoId);
router.delete('/empleado/:empleadoId/multiple', authMiddleware(['admin', 'manager']), validarIdEvaluador, EvaluadorController.eliminarEvaluadoresPorEmpleadoId);

module.exports = router;
