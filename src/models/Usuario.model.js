const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'El email es requerido'],
    trim: true,
    lowercase: true,
  },
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es requerido'],
    trim: true,
  },
  usuario: {
    type: String,
    required: [true, 'El nombre de usuario es requerido'],
    trim: true,
    unique: true,
  },
  contraseña: {
    type: String,
    required: [true, 'La contraseña es requerida'],
  },
  telefono: {
    type: String,
    trim: true,
  },
  rol: {
    type: String,
    enum: ['admin', 'manager', 'employee'],
    required: [true, 'El rol es requerido'],
  },
  estado: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },
  verificado: {
    type: Boolean,
    default: false
  },
  ultimoLogin: {
    type: Date,
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

// Middleware para actualizar la fecha de actualización
UsuarioSchema.pre('findOneAndUpdate', function (next) {
  this.set({ fechaActualizacion: new Date() });
  next();
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;
