const express = require('express');
const router = express.Router();
const CompetenciaController = require('@controllers/Competencia.controller');
const { validarcompetencia, validarIdcompetencia, validarActualizarcompetencia } = require('@middlewares/validation/Competencia.validation');
const authMiddleware = require('@middlewares/Auth.middleware');

router.get('/', authMiddleware(['admin', 'manager']), CompetenciaController.listarcompetencias);
router.get('/:id', authMiddleware(['admin', 'manager']), validarIdcompetencia, CompetenciaController.obtenercompetenciaPorId);
router.post('/', authMiddleware(['admin']), validarcompetencia, CompetenciaController.crearcompetencia);
router.put('/:id', authMiddleware(['admin']), validarIdcompetencia, validarActualizarcompetencia, CompetenciaController.actualizarcompetencia);
router.delete('/:id', authMiddleware(['admin']), validarIdcompetencia, CompetenciaController.eliminarcompetencia);

module.exports = router;
    