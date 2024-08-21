const mongoose = require('mongoose');

const NotificacionSchema = new mongoose.Schema({
  empleadoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado',
    required: [true, 'El ID del empleado es requerido'],
  },
  mensaje: {
    type: String,
    required: [true, 'El mensaje de la notificación es requerido'],
  },
  leido: {
    type: Boolean,
    default: false,
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

module.exports = mongoose.model('Notificacion', NotificacionSchema);
