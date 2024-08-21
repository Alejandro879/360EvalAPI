const { body, param } = require('express-validator');

const validaremploye = [
    body('nombres').notEmpty().withMessage('El nombre es obligatorio'),
    body('apellidos').notEmpty().withMessage('El apellido es obligatorio'),
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('telefono').notEmpty().withMessage('El teléfono es obligatorio')
        .isMobilePhone(['es-VE', 'es-PA']).withMessage('El número de teléfono debe ser un número validao de Panama o venezuela, en formato internacional.'),
    body('puesto').notEmpty().withMessage('El puesto es obligatorio')
        .isIn(['Jefe de Sistemas', 'Programador', 'Director de Recursos Humanos', 'Reclutador', 'Gerente General'])
        .withMessage("El puesto debe ser 'Jefe de Sistemas', 'Programador', 'Director de Recursos Humanos', 'Reclutador' o 'Gerente General'"),
    body('departamento').notEmpty().withMessage('El departamento es obligatorio')
        .isIn(['Recursos Humanos', 'Contabilidad', 'Ventas', 'Informática', 'Dirección General'])
        .withMessage("El departamento debe ser 'Recursos Humanos', 'Contabilidad', 'Ventas', 'Informática' o 'Dirección General'"), 
    body('salario').isNumeric().withMessage('El salario debe ser un número'),
];

const validarActualizaremploye = [
    body('nombres')
    .optional()
    .isLength({min: 4}).withMessage('El nombre debe contener al menos 4 caracteres.')
    .notEmpty().withMessage('El nombre es obligatorio'),
    body('apellidos').optional().notEmpty().withMessage('El apellido es obligatorio'),
    body('email').optional().isEmail().withMessage('Debe ser un email válido'),
    body('telefono').optional().notEmpty().withMessage('El teléfono es obligatorio')
        .isMobilePhone(['es-VE', 'es-PA']).withMessage('El número de teléfono debe ser un número validao de Panama o venezuela, en formato internacional.'),
    body('puesto').optional().notEmpty().withMessage('El puesto es obligatorio')
        .isIn(['Jefe de Sistemas', 'Programador', 'Director de Recursos Humanos', 'Reclutador', 'Gerente General'])
        .withMessage("El puesto debe ser 'Jefe de Sistemas', 'Programador', 'Director de Recursos Humanos', 'Reclutador' o 'Gerente General'"),
    body('departamento').optional().notEmpty().withMessage('El departamento es obligatorio')
        .isIn(['Recursos Humanos', 'Contabilidad', 'Ventas', 'Informática', 'Dirección General'])
        .withMessage("El departamento debe ser 'Recursos Humanos', 'Contabilidad', 'Ventas', 'Informática' o 'Dirección General'"), 
    body('salario').optional().isNumeric().withMessage('El salario debe ser un número'),
];

const validarIdemploye = [
    param('id').isMongoId().withMessage('ID de empleado inválido')
];

module.exports = {
    validaremploye,
    validarIdemploye,
    validarActualizaremploye
}; 
