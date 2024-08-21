const mongoose = require('mongoose');

const RespuestaSchema = new mongoose.Schema({
  preguntaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pregunta',
    required: [true, 'El ID de la pregunta es requerido'],
  },
  evaluacionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evaluacion',
    required: [true, 'El ID de la evaluación es requerido'],
  },
  evaluadorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evaluador',
    required: [true, 'El ID del evaluador es requerido'],
  }, 
  evaluadoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evaluador',
    required: [true, 'El ID del evaluado es requerido'],
  },
  valor: {
    type: Number,
    required: [true, 'El valor de la respuesta es requerido'],
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

// Agregar índice único para los campos nombre y competenciaId
RespuestaSchema.index({ preguntaId: 1, evaluacionId: 1, evaluadorId: 1}, { unique: true });
// Middleware para actualizar la fecha de actualización
RespuestaSchema.pre('findOneAndUpdate', function(next) {
  this.set({ fechaActualizacion: new Date() });
  next();
});

const Respuesta = mongoose.model('Respuesta', RespuestaSchema);

module.exports = Respuesta;
