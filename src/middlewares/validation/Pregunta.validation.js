const { body, param } = require('express-validator');

const validarpregunta = [
  body('competenciaId')
    .notEmpty().withMessage('El ID de la competencia es requerido')
    .isMongoId().withMessage('El ID de la competencia debe ser un MongoID válido'),

  body('texto')
    .notEmpty().withMessage('El texto de la pregunta es requerido')
    .trim(),

  body('opciones')
    .isArray({ min: 2 }).withMessage('El campo opciones debe ser un array con al menos 2 elementos')
    .custom((opciones) => {
      return opciones.every(opcion =>
        typeof opcion.texto === 'string' && opcion.texto.trim() !== '' &&
        typeof opcion.value === 'number'
      );
    }).withMessage('Cada opción debe tener un texto (string) y un valor (number) válidos'),

  body('opciones.*.texto')
    .notEmpty().withMessage('El texto de la opción es requerido')
    .isString().withMessage('El texto de la opción debe ser una cadena de texto')
    .trim(),

  body('opciones.*.value')
    .notEmpty().withMessage('El valor de la opción es requerido')
    .isNumeric().withMessage('El valor de la opción debe ser un número'),
];

const validarIdpregunta = [
  param('id')
    .isMongoId().withMessage('El ID debe ser un ObjectId válido'),
];

const validarActualizarpregunta = [
  body('competenciaId')
    .optional()
    .notEmpty().withMessage('El ID de la competencia es requerido')
    .isMongoId().withMessage('El ID de la competencia debe ser un MongoID válido'),

  body('texto')
    .optional()
    .notEmpty().withMessage('El texto de la pregunta es requerido')
    .trim(),

  body('opciones')
    .optional()
    .isArray({ min: 2 }).withMessage('El campo opciones debe ser un array con al menos 2 elementos')
    .custom((opciones) => {
      return opciones.every(opcion =>
        typeof opcion.texto === 'string' && opcion.texto.trim() !== '' &&
        typeof opcion.value === 'number'
      );
    }).withMessage('Cada opción debe tener un texto (string) y un valor (number) válidos'),

  body('opciones.*.texto')
    .notEmpty().withMessage('El texto de la opción es requerido')
    .isString().withMessage('El texto de la opción debe ser una cadena de texto')
    .trim(),

  body('opciones.*.value')
    .notEmpty().withMessage('El valor de la opción es requerido')
    .isNumeric().withMessage('El valor de la opción debe ser un número'),
];

module.exports = {
  validarpregunta,
  validarIdpregunta,
  validarActualizarpregunta
}; 
