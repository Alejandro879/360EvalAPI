const { body, check } = require('express-validator');

const usuarioValidaciones = [
  body('email')
    .isEmail().withMessage('El formato del email es inválido.')
    .notEmpty().withMessage('El email es requerido.')
    .trim()
    .normalizeEmail(),

  body('nombre')
    .notEmpty().withMessage('El nombre es requerido.')
    .trim(),

  body('apellido')
    .notEmpty().withMessage('El apellido es requerido.')
    .trim(),

  body('usuario')
    .notEmpty().withMessage('El nombre de usuario es requerido.')
    .trim()
    .isLength({ min: 5 }).withMessage('El nombre de usuario debe tener al menos 5 caracteres.'),

  body('contraseña')
    .notEmpty().withMessage('La contraseña es requerida.')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),

  body('telefono')
    .optional()
    .isMobilePhone('any').withMessage('El teléfono debe ser un número válido.'),

  body('rol')
    .isIn(['admin', 'manager', 'employee']).withMessage('Rol inválido.')
    .notEmpty().withMessage('El rol es requerido.'),

  body('estado')
    .optional()
    .isBoolean().withMessage('El estado debe ser un valor booleano.'),

  body('verificado')
    .optional()
    .isBoolean().withMessage('El verificado debe ser un valor booleano.'),

  body('ultimoLogin')
    .optional()
    .isISO8601().withMessage('La fecha de último login debe ser una fecha válida en formato ISO.'),

  body('fechaCreacion')
    .optional()
    .isISO8601().withMessage('La fecha de creación debe ser una fecha válida en formato ISO.'),

  body('fechaActualizacion')
    .optional()
    .isISO8601().withMessage('La fecha de actualización debe ser una fecha válida en formato ISO.')
];


const registroUsuarioValidator = [
  body('email')
    .isEmail().withMessage('El formato del email es inválido.')
    .notEmpty().withMessage('El email es requerido.')
    .trim()
    .normalizeEmail(),

  body('nombre')
    .notEmpty().withMessage('El nombre es requerido.')
    .trim(),

  body('apellido')
    .notEmpty().withMessage('El apellido es requerido.')
    .trim(),

  body('usuario')
    .notEmpty().withMessage('El nombre de usuario es requerido.')
    .trim()
    .isLength({ min: 5 }).withMessage('El nombre de usuario debe tener al menos 5 caracteres.'),

  body('contraseña')
    .notEmpty().withMessage('La contraseña es requerida.')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),

  body('rol')
    .notEmpty().withMessage('El rol es requerido.')
    .isIn(['admin', 'manager', 'employee']).withMessage("Rol inválido. Los roles permitidos son los siguientes ['admin', 'manager', 'employee']"),
];

const loginUsuarioValidator = [
  body('usuario')
    .notEmpty().withMessage('El nombre de usuario es requerido.')
    .trim()
    .isLength({ min: 5 }).withMessage('El nombre de usuario debe tener al menos 5 caracteres.'),

  body('contraseña')
    .notEmpty().withMessage('La contraseña es requerida.')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
]


module.exports = {
  registroUsuarioValidator,
  usuarioValidaciones,
  loginUsuarioValidator
}; 
