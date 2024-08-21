const mongoose = require('mongoose');

const EmpleadoSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'El email es requerido'],
    trim: true,
    lowercase: true,
    ref: 'Usuario', // Llave foránea que referencia al modelo Usuario
  },
  nombres: {
    type: String,
    required: [true, 'Los nombres son requeridos'],
    trim: true,
  },
  apellidos: {
    type: String,
    required: [true, 'Los apellidos son requeridos'],
    trim: true,
  },
  puesto: {
    type: String,
    required: [true, 'El puesto es requerido'],
    trim: true,
  },
  departamento: {
    type: String,
    required: [true, 'El departamento es requerido'],
    trim: true,
  },
  salario: {
    type: Number,
    required: [true, 'El salario es requerido'],
  },
  fechaContrato: {
    type: Date,
    default: Date.now,
  },
  evaluaciones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Evaluacion',
      default: [],
    }
  ],
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now,
  },
});

// Middleware para actualizar la fecha de actualización
EmpleadoSchema.pre('findOneAndUpdate', function(next) {
  this.set({ fechaActualizacion: new Date() });
  next();
});

const Empleado = mongoose.model('Empleado', EmpleadoSchema);

module.exports = Empleado;
