const mongoose = require('mongoose');

const CompetenciaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre de la competencia es requerido'],
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  estado: {
    type: Boolean,
    default: true,
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

// Agregar índice único para los campos nombre
CompetenciaSchema.index({ nombre: 1}, { unique: true });

// Middleware para actualizar la fecha de actualización
CompetenciaSchema.pre('findOneAndUpdate', function(next) {
  this.set({ fechaActualizacion: new Date() });
  next();
});

const Competencia = mongoose.model('Competencia', CompetenciaSchema);

module.exports = Competencia;
