const Notificacion = require('@models/Notificacion.model'); 

class NotificacionService {
  // Listar todos los notificacions
  async listarnotificacions() {
    try {
      return await Notificacion.find();
    } catch (error) {
      throw new Error('Error al listar notificacions: ' + error.message);
    }
  }

  // Obtener notificacion por ID de empleado
  async listarnotificacionsxempleado(empleadoId) {

    try {
      const notificacion = await Notificacion.find({empleadoId});
      if (!notificacion) {
        throw new Error('Notificacion no encontrado');
      }
      return notificacion;
    } catch (error) {
      throw new Error('Error al obtener notificacion: ' + error.message);
    }
  }

  // Obtener notificacion por ID
  async obtenernotificacionPorId(id) {

    try {
      const notificacion = await Notificacion.findById(id);
      if (!notificacion) {
        throw new Error('Notificacion no encontrado');
      }
      return notificacion;
    } catch (error) {
      throw new Error('Error al obtener notificacion: ' + error.message);
    }
  }

  // Crear un nuevo notificacion
  async crearnotificacion(data) {
    try {
      const notificacion = new Notificacion(data);
      return await notificacion.save();
    } catch (error) {
      throw new Error('Error al crear notificacion: ' + error.message);
    }
  }

  // Actualizar un notificacion existente
  async actualizarnotificacion(id, data) {
    try {
      const updatedNotificacion = await Notificacion.findByIdAndUpdate(id, data, { new: true });
      if (!updatedNotificacion) {
        throw new Error('Notificacion no encontrado');
      }
      return updatedNotificacion;
    } catch (error) {
      throw new Error('Error al actualizar notificacion: ' + error.message);
    }
  }

  // Eliminar un notificacion
  async eliminarnotificacion(id) {
    try {
      const deletedNotificacion = await Notificacion.findByIdAndDelete(id);
      if (!deletedNotificacion) {
        throw new Error('Notificacion no encontrado');
      }
      return deletedNotificacion;
    } catch (error) {
      throw new Error('Error al eliminar notificacion: ' + error.message);
    }
  }
}

module.exports = new NotificacionService();
