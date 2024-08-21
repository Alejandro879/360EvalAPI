const mongoose = require('mongoose');

const EvaluacionSchema = new mongoose.Schema({
  evaluado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado',
    required: [true, 'El evaluado es requerido'],
  },
  estado: {
    type: String,
    enum: ['Pendiente', 'Completada'],
    default: 'Pendiente',
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  fechaFinalizacion: {
    type: Date, 
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now,
  },
});

// Middleware para actualizar la fecha de actualización
EvaluacionSchema.pre('findOneAndUpdate', function(next) {
  this.set({ fechaActualizacion: new Date() });
  next();
});

const Evaluacion = mongoose.model('Evaluacion', EvaluacionSchema);

module.exports = Evaluacion;
