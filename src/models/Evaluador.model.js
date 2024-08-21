const mongoose = require('mongoose');

const EvaluadorSchema = new mongoose.Schema({ 
  evaluadorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado',
    required: [true, 'El ID del empleado es requerido'],
  },
  tipoEvaluador: {
    type: String,
    enum: ['Supervisor', 'Colega', 'Subordinado', 'Cliente', 'Autoevaluación'],
    required: [true, 'El tipo de evaluador es requerido'],
  }, 
  empleadoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado',
    required: [true, 'El ID del empleado es requerido'],
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now,
  },
});

// Agregar índice único para los campos evaluadorId y empleadoId
EvaluadorSchema.index({ evaluadorId: 1, empleadoId: 1 }, { unique: true });

// Middleware para actualizar la fecha de actualización
EvaluadorSchema.pre('findOneAndUpdate', function(next) {
  this.set({ fechaActualizacion: new Date() });
  next();
});

const Evaluador = mongoose.model('Evaluador', EvaluadorSchema);

module.exports = Evaluador;
