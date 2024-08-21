const express = require('express');
const router = express.Router();
const PreguntaController = require('@controllers/Pregunta.controller');
const { validarpregunta, validarIdpregunta, validarActualizarpregunta } = require('@middlewares/validation/Pregunta.validation');
const authMiddleware = require('@middlewares/Auth.middleware');

router.get('/', authMiddleware(['admin', 'manager']), PreguntaController.listarpreguntas);
router.get('/:id', authMiddleware(['admin', 'manager']), validarIdpregunta, PreguntaController.obtenerpreguntaPorId);
router.post('/', authMiddleware(['admin']), validarpregunta, PreguntaController.crearpregunta);
router.put('/:id', authMiddleware(['admin']), validarIdpregunta, validarActualizarpregunta, PreguntaController.actualizarpregunta);
router.delete('/:id', authMiddleware(['admin']), validarIdpregunta, PreguntaController.eliminarpregunta);

module.exports = router;
