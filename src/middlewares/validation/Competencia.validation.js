const { body, param } = require('express-validator');

const validarcompetencia = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripcion es obligatorio'),
    body('estado').optional().isBoolean().withMessage('El estado debe ser true o false'),
];

const validarActualizarcompetencia = [
    body('nombre').optional().notEmpty().withMessage('El nombre es obligatorio'),
    body('descripcion').optional().notEmpty().withMessage('La descripcion es obligatorio'),
    body('estado').optional().isBoolean().withMessage('El estado debe ser true o false'),
];

const validarIdcompetencia = [
    param('id').isMongoId().withMessage('ID de empleado inválido')
];

module.exports = {
    validarcompetencia,
    validarIdcompetencia,
    validarActualizarcompetencia
}; 
