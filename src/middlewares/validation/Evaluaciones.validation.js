const { body, param } = require('express-validator');

const validarEvaluacion = [
  body('evaluado').isMongoId().withMessage('ID de empleado inválido'),
  body('fechaFinalizacion')
    .isISO8601().withMessage('La fecha de finalización debe ser una fecha válida')
    .isAfter(new Date().toISOString()).withMessage('La fecha de finalización debe ser mayor a la fecha de hoy'),
  body('estado').optional().isIn(['Pendiente', 'Completada']).withMessage("Estado inválido. Ej: ['Pendiente', 'Completada']"),
];

const validarEvaluacionActualizar = [
  body('evaluado').optional().isMongoId().withMessage('ID de empleado inválido'),
  body('fechaFinalizacion').optional()
    .isISO8601().withMessage('La fecha de finalización debe ser una fecha válida')
    .isAfter(new Date().toISOString()).withMessage('La fecha de finalización debe ser mayor a la fecha de hoy'),
  body('estado').optional().isIn(['Pendiente', 'Completada']).withMessage("Estado inválido. Ej: ['Pendiente', 'Completada']"),
];

const validarEvaluacionSubmit = [
  body('evaluadorId').isMongoId().withMessage('ID del evaluador inválido'),
  body('evaluadoId').isMongoId().withMessage('ID del evaluado inválido'),
  body('respuestas')
    .isArray({ min: 1 }).withMessage('El campo respuestas debe ser un array con al menos 1 elementos'), 
  body('respuestas.*.preguntaId')
    .notEmpty().withMessage('El valor de la opción es requerido')
    .isMongoId().withMessage('ID de la pregunta inválido'),
  body('respuestas.*.value')
    .notEmpty().withMessage('El valor de la opción es requerido')
    .isNumeric().withMessage('El valor de la opción debe ser un número'),
];

const validarIdEvaluacion = [
  param('id').isMongoId().withMessage('ID de evaluación inválido')
];

module.exports = {
  validarEvaluacion,
  validarIdEvaluacion,
  validarEvaluacionActualizar,
  validarEvaluacionSubmit
};
