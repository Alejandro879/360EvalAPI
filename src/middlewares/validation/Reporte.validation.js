const { param } = require('express-validator');

const validarID = [
  param('id')
    .isMongoId().withMessage('El ID debe ser un ObjectId válido'),
];

const validarDepartamento = [
  param('id')
    .notEmpty().withMessage('El identificador del departamento es obligatorio')
    .isIn(['Recursos Humanos', 'Contabilidad', 'Ventas', 'Informática', 'Dirección General'])
    .withMessage("El identificador del departamento debe ser 'Recursos Humanos', 'Contabilidad', 'Ventas', 'Informática' o 'Dirección General'")
]


module.exports = {
  validarID,
  validarDepartamento
}; 