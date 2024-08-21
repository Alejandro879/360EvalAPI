const express = require('express');
const router = express.Router();
const EmployeController = require('@controllers/Empleado.controller');
const { validaremploye, validarIdemploye, validarActualizaremploye } = require('@middlewares/validation/Empleado.validation');
const authMiddleware = require('@middlewares/Auth.middleware');

router.get('/', authMiddleware(['admin', 'manager']), EmployeController.listaremployes);
router.get('/:id', authMiddleware(['admin', 'manager']), validarIdemploye, EmployeController.obteneremployePorId);
router.post('/', authMiddleware(['admin']), validaremploye, EmployeController.crearemploye);
router.put('/:id', authMiddleware(['admin']), validarIdemploye, validarActualizaremploye, EmployeController.actualizaremploye);
router.delete('/:id', authMiddleware(['admin']), validarIdemploye, EmployeController.eliminaremploye);

module.exports = router;
