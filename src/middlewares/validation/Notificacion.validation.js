const { body, param } = require('express-validator');

const validarnotificacion = [
    body('empleadoId').isMongoId().withMessage('El empleadoId es obligatorio y debe ser un ID valido.'),
    body('mensaje').notEmpty().withMessage('La mensaje es obligatorio'),
    body('leido').optional().isBoolean().withMessage('El estado de leido debe ser true o false'),
];

const validarActualizarnotificacion = [
    body('empleadoId').optional().isMongoId().withMessage('El empleadoId es obligatorio y debe ser un ID valido.'),
    body('mensaje').optional().notEmpty().withMessage('La mensaje es obligatorio'),
    body('leido').optional().isBoolean().withMessage('El estado de leido debe ser true o false'),
];

const validarIdnotificacion = [
    param('id').isMongoId().withMessage('ID de empleado inválido')
];

module.exports = {
    validarnotificacion,
    validarIdnotificacion,
    validarActualizarnotificacion
}; 
