const express = require('express');
const router = express.Router();
const ReporteController = require('@controllers/Reporte.controller');
const { validarID, validarDepartamento } = require('@middlewares/validation/Reporte.validation');
const authMiddleware = require('@middlewares/Auth.middleware');

router.get('/employee/:id', authMiddleware(['admin', 'manager']), validarID, ReporteController.reporteEmpleado); 
router.get('/department/:id', authMiddleware(['admin', 'manager']), validarDepartamento, ReporteController.reporteDepartamento);  

module.exports = router;
