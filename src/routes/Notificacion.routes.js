const express = require('express');
const router = express.Router();
const NotificacionController = require('@controllers/Notificacion.controller');
const { validarnotificacion, validarIdnotificacion, validarActualizarnotificacion } = require('@middlewares/validation/Notificacion.validation');
const authMiddleware = require('@middlewares/Auth.middleware');

router.get('/', authMiddleware(['admin', 'manager']), NotificacionController.listarnotificacions);
router.get('/empleado/:id', authMiddleware(['admin', 'manager', 'employee']), NotificacionController.listarnotificacionsxempleado);
router.get('/:id', authMiddleware(['admin', 'manager', 'employee']), validarIdnotificacion, NotificacionController.obtenernotificacionPorId);
router.post('/', authMiddleware(['admin', 'manager', 'employee']), validarnotificacion, NotificacionController.crearnotificacion);
router.put('/:id', authMiddleware(['admin', 'manager', 'employee']), validarIdnotificacion, validarActualizarnotificacion, NotificacionController.actualizarnotificacion);
router.delete('/:id', authMiddleware(['admin']), validarIdnotificacion, NotificacionController.eliminarnotificacion);

module.exports = router;
