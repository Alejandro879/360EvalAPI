const mongoose = require('mongoose');

const PreguntaSchema = new mongoose.Schema({
  competenciaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competencia',
    required: [true, 'El ID de la competencia es requerido'],
  },
  texto: {
    type: String,
    required: [true, 'El texto de la pregunta es requerido'],
    trim: true,
  },
  opciones: {
    type: [
      {
        texto: { type: String, required: [true, 'El texto de la opción es requerido'] },
        value: { type: Number, required: [true, 'El valor de la opción es requerido'] }
      }
    ],
    default: [
      { texto: "Excelente", value: 5 },
      { texto: "Muy bueno", value: 4 },
      { texto: "Bueno", value: 3 },
      { texto: "Regular", value: 2 },
      { texto: "Malo", value: 1 }
    ],
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

// Agregar índice único para los campos nombre y competenciaId
PreguntaSchema.index({ texto: 1, competenciaId: 1}, { unique: true });

// Middleware para actualizar la fecha de actualización
PreguntaSchema.pre('findOneAndUpdate', function (next) {
  this.set({ fechaActualizacion: new Date() });
  next();
});

const Pregunta = mongoose.model('Pregunta', PreguntaSchema);

module.exports = Pregunta;
