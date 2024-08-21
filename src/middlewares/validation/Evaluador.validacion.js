const { body, param } = require('express-validator');

const validarEvaluador = [
  body('evaluadorId')
    .notEmpty().withMessage('El ID del evaluador es requerido')
    .isMongoId().withMessage('El ID del evaluador debe ser un ObjectId válido'),
  body('tipoEvaluador')
    .notEmpty().withMessage('El tipo de evaluador es requerido')
    .isIn(['Supervisor', 'Colega', 'Subordinado', 'Cliente', 'Autoevaluación']).withMessage("Tipo de evaluador inválido. Debe ser ['Supervisor', 'Colega', 'Subordinado', 'Cliente', 'Autoevaluación']"),
  body('empleadoId')
    .notEmpty().withMessage('El ID del empleado es requerido')
    .isMongoId().withMessage('El ID del empleado debe ser un ObjectId válido'),
];


const validarIdEvaluador = [
  param('id')
    .isMongoId().withMessage('El ID debe ser un ObjectId válido'),
];

const validarMultipleEvaluadores = [
    param('empleadoId')
      .notEmpty().withMessage('El ID del empleado es requerido')
      .isMongoId().withMessage('El ID del empleado debe ser un ObjectId válido'),
    body('evaluadores')
      .isArray().withMessage('Se debe proporcionar un array de evaluadores'),
    body('evaluadores.*.evaluadorId')
      .notEmpty().withMessage('El ID del evaluador es requerido')
      .isMongoId().withMessage('El ID del evaluador debe ser un ObjectId válido'),
    body('evaluadores.*.tipoEvaluador')
      .notEmpty().withMessage('El tipo de evaluador es requerido')
      .isIn(['Supervisor', 'Colega', 'Subordinado', 'Cliente', 'Autoevaluación']).withMessage("Tipo de evaluador inválido, Ej: ['Supervisor', 'Colega', 'Subordinado', 'Cliente', 'Autoevaluación']"),
  ];

module.exports = {
  validarEvaluador,
  validarIdEvaluador,
  validarMultipleEvaluadores,
};
